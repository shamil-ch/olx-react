import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import SignupPage from './pages/Signup';
import Login from './pages/Login';
import CreatePage from './pages/create';
import ViewPost from './pages/Viewpost'
import Post from './store/PostContext';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const auth = getAuth();
    const unsuscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
    })
    return () => {
      unsuscribe();
    };
  }, [firebase, setUser] );

  
  return (
    <div>
      
      <Post>
      
      <Router>
        <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/Signup' element={<SignupPage />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='Create' element={<CreatePage />} />
          <Route path='/view' element={<ViewPost /> } ></Route>
         
        </Routes>
      </Router>
     
      </Post>
      
    </div>
  );
}

export default App;