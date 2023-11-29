import React, { Fragment, useContext, useState } from 'react';
import './create.css'
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Waveform} from "@uiball/loaders"


const Create = () => {
 
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [images, setImages] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  const firestore = getFirestore(firebase);
  const navigate = useNavigate();
  const date = new Date()

  const handleSubmit = () => {
    if(!name || !category || !images) {
      setError("Please fill in all required fields")
      return;
    }

    if(!price || parseFloat(price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }
    setLoading(true);


    const storage = getStorage();
    const storageRef = ref(storage, `/image/${images.name}`);

   uploadBytes(storageRef, images)
    .then((snapshot)=>{
      getDownloadURL(snapshot.ref)
        .then((downloadURL)=>{
          const productData = {
            name: name,
            category: category,
            price: parseFloat(price),
            url: downloadURL,
            userId: user.uid,
            createdAt: date.toDateString()
          };

      const productsCollection = collection(firestore, "products");

      addDoc(productsCollection, productData).then(()=> {
        console.log("product saved to firestore");
        navigate("/");
      })
      .catch((error)=>{
        console.error("Error saving product to firestore:",error);
        navigate("/create");
      })
    })
    .catch((error)=> {
      console.error("Error getting downloaded URL:", error)
      navigate("/create");
    })
    .finally(()=>{
    setLoading(false)
  });
});;
}


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         {error && <p className='error'>{error}</p>}
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} id="fname" onChange={(e)=>setPrice(e.target.value)} name="Price" />
            <br />
         
          <br />
          <img  
          alt="Posts"
          width="200px" 
          height="200px" 
          src={images ? URL.createObjectURL(images):''}
          ></img>
          
            <br />
            <input 
            type="file" 
            onChange={(e)=>{setImages(e.target.files[0]) }}
            required
            />
            <br />
            <button 
            onClick={handleSubmit} 
            className="uploadBtn">
              upload and Submit
              </button>
       {loading && (
        <div className='loader-container'>
          <Waveform />
          </div>
       )}
        </div>
      </card>
    </Fragment>
  );
};
export default Create;