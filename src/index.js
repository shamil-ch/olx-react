import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, { FirebaseContext } from './store/FirebaseContext';
import { firebaseApp } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<FirebaseContext.Provider value={{firebase : firebaseApp}}>
    <Context>
        <App />
    </Context>
</FirebaseContext.Provider>
);


