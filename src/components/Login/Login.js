import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { firebaseApp } = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      navigate("/")
    }).catch((error) => {
      console.log("LOGIN ERROR",error)
      if(error.message.includes("email")) {
        document.getElementById("errMsg").innerText = 
        " Invalid Email Format, Please use a valid Email"
      }
      else if(error.message.includes("credentials")) {
        document.getElementById("errMsg").innerText = 
        "Email or password may be incorrect "
      }
      else {
        document.getElementById("errMsg").innerText = 
        "Server Timed out, Try again after some time"
      }
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='olx'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="lname"
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/Signup' role="button"> Signup</a>
        <p id='errMsg'></p>
      </div>
    </div>
  );
}

export default Login;