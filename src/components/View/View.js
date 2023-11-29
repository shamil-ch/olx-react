import { collection, getDocs, query as firestoreQuery, where} from 'firebase/firestore';
import {firestore } from '../../firebase/config'
import React, { useState, useContext, useEffect } from 'react';
import { postContext } from '../../store/PostContext';
import './View.css';

function View() {

  const [userDetails, setUserDetails ] = useState();
  const { postDetails } = useContext(postContext)

  useEffect(() => {
  const userId = postDetails ? postDetails.userId : null;
  const userRef = collection(firestore,'users');
  const query = firestoreQuery(userRef, where('id', '==', userId));

  getDocs(query)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data());
    });
  })
  .catch((error) => {
    console.alert('error fetching user details',error);
  })
  }, [postDetails])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        {postDetails && ( 
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        )}
        {userDetails && 
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{ userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
}
      </div>
    </div>
  );
}
export default View;