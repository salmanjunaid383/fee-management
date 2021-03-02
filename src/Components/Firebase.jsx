import React from 'react';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAlBWKpqxw1mLNAh8g7Co7JVNuTaDtgBwM",
    authDomain: "my-crud-8e477.firebaseapp.com",
    projectId: "my-crud-8e477",
    storageBucket: "my-crud-8e477.appspot.com",
    messagingSenderId: "608239007904",
    appId: "1:608239007904:web:03140439e0e90e069131c5",
    measurementId: "G-P6PF38Q19F"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;