import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FirebaseContext';
import './post.css';
import { postContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';



function Posts() {

  const {firebase} = useContext(FirebaseContext);
  const firestore = getFirestore(firebase);

  const { setPostDetails } = useContext(postContext)

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productsRef = collection(firestore, 'products');

    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        const data = product.data();
        return {
          ...data,
          id: product.id,
        };
      });
      setProducts(allPost);
    });

    return () => {
      unsubscribe();
    };
  }, [firestore])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product)=> (
 <div
 className="card" onClick={() => {
  setPostDetails(product);
  navigate('/view')
 }}
>
 <div className="favorite">
   <Heart></Heart>
 </div>
 <div className="image">
   <img src={product.url} alt={product.name} />
 </div>
 <div className="content">
   <p className="rate">&#x20B9; {product.price}</p>
   <span className="kilometer"> {product.category} </span>
   <p className="name"> {product.name} </p>
 </div>
 <div className="date">
   <span> {product.createdAt} </span>
 </div>
 </div>
          ))}
         
          
       
        </div>
      </div>
    </div>
  );
}

export default Posts;