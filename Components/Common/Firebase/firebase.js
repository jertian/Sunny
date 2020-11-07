// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBaNoQRKumEM0dJrdF9a38mJmDE7ARB-oQ",
    authDomain: "comp3004-fa42f.firebaseapp.com",
    databaseURL: "https://comp3004-fa42f.firebaseio.com",
    projectId: "comp3004-fa42f",
    storageBucket: "comp3004-fa42f.appspot.com",
    messagingSenderId: "1051695623142",
    appId: "1:1051695623142:web:484d5ec44e9271c06b8427",
    measurementId: "G-MPLY6SKB5F"
  };

  
firebase.initializeApp(firebaseConfig);
