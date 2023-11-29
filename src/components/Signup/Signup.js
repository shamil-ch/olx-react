import React, { useState, useContext } from 'react';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


export default function Signup() {

  const firestore = getFirestore();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')

 const {firebaseApp} = useContext(FirebaseContext);
 const auth = getAuth(firebaseApp);


  const handleSubmit = async (e)=>{
    e.preventDefault();

    const usersCollection = collection(firestore, 'users');
    const querySnapshot = await getDocs(usersCollection);
    let emailExists = false;
    let phoneExists = false;

    querySnapshot.docs.forEach((doc) => {
      const userData = doc.data();
      if (userData.email === email) {
        emailExists = true;
      }
      if (userData.phone === phone) {
        phoneExists = true;
      }
    });

      if (emailExists) {
        document.getElementById("errMsg").innerText = 
        "Email already Exists"
        return;
      }
      if (phoneExists) {
        document.getElementById("errMsg").innerText = 
        "Phone Number already Exists"
        return
      }


      createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: username,
        })
        .then(() => {
          addDoc(usersCollection, {
            id: user.uid,
            username: username,
            phone: phone,
            email: email,
            password: password,
          })
          .then(() => {
            navigate("/login")
          }).catch((error) => {
            console.error("Error adding using to firestore", error)
          });
        }).catch((error) => {
          console.error("Error Updating Profile", error)
        }); 
      })
      .catch((error) => {
        if (error.message.includes("(auth/invalid-email)")) {
          document.getElementById("errMsg").innerText = 
          "Invalid email Format! Please enter a valid Email "
        }else {
          document.getElementById("errMsg").innerText = 
          "Server Timed out! Please try again after some time"
        }
      })
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=> { 
              const formattedUserName = e.target.value.replace(
              /[^A-Za-z ]/g,
              ""
            );
            setUsername(formattedUserName)
              }}
            id="fname"
            name="name"
            autoComplete='on'

          />
          <br />

          <label htmlFor="femail">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="femail"
            name="email"
            autoComplete='on'
          />

          <br />
          <label htmlFor="lphone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=> {
              const formatedPhone = e.target.value.replace(/\D/g, "");
              if (formatedPhone.length <= 10) {
                setPhone(formatedPhone)
              }
            }}
            id="lphone"
            name="phone"
            pattern='[0-9]'
            title='Please Enter only digits, Maximum 10 digits'
            minLength={10}
            maxLength={10}
            required
            autoComplete='on'
          />

          <br />
          <label htmlFor="lpass">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lpass"
            name="password"
            minLength={6}
            title="Password Should contain 6 characters"
            autoComplete='on'
            required
          />

          <br />
          <br />

          <button type='submit'>Signup</button>
        </form>
        <a href="/login" className='hvr-grow-shadow'>Login</a>
        <p id="errMsg"></p>
      </div>
    </div>
  );
}