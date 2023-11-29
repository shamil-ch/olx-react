import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1lLmFqRtbDRptj1nMRafmFhrJtydXBuc",
  authDomain: "olx-clone-720c1.firebaseapp.com",
  projectId: "olx-clone-720c1",
  storageBucket: "olx-clone-720c1.appspot.com",
  messagingSenderId: "570302445437",
  appId: "1:570302445437:web:f3e079b2a168cc28f93e14",
  measurementId: "G-XMREDHSE69"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore};