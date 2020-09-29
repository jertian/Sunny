import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBaNoQRKumEM0dJrdF9a38mJmDE7ARB-oQ",
    authDomain: "comp3004-fa42f.firebaseapp.com",
    databaseURL: "https://comp3004-fa42f.firebaseio.com",
    projectId: "comp3004-fa42f",
    storageBucket: "comp3004-fa42f.appspot.com",
    messagingSenderId: "1051695623142",
    appId: "1:1051695623142:web:484d5ec44e9271c06b8427",
    measurementId: "G-MPLY6SKB5F"
};
firebase.initializeApp(config);
export default firebase;