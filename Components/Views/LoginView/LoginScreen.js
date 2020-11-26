import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton"
import LoginSocialButton from "./LoginSocialButton"
import { useSelector, useDispatch } from 'react-redux'
import "firebase/firestore";
import firebase from "firebase/app";
import {firebaseConfig} from "./../../Common/Firebase/firebase"
//import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import { StackActions, NavigationActions } from 'react-navigation';

if (!firebase.apps.length) {

firebase.initializeApp(firebaseConfig);
}

//Set to false to stay on screen to do other things
//Used for faster testing
const fastGuestLogin = false;

const fastGoogleLogin = false;


/*
const ThemeContext = React.createContext("light");
const selectAccount = state => state.account
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/userinfo.profile');
providerGoogle.addScope('https://www.googleapis.com/auth/userinfo.email');

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.addScope('user_photos');
providerFacebook.setCustomParameters({
  'display': 'popup'
});

firebase.auth().languageCode = 'en';
providerGoogle.setCustomParameters({
  'login_hint': 'user@example.com'
});
*/



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");
  
  const dispatchAccount = useDispatch()
  function navigateToHome(){

    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }
  async function signInWithGoogleAsync() {
    try {

      const result = await Google.logInAsync({
        androidClientId: "967944969087-bs2s7470jbft6scjau1fajhjcs5tkltb.apps.googleusercontent.com",
        iosClientId: "967944969087-6b4do4v4ffsfb5qldjp462md0edasaej.apps.googleusercontent.com",
        clientId: "967944969087-igc0ds2nch2bjkb375h3opot65pela5g.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        debugger;
        console.log("Google Sign In Scuessful")
        console.log(result);
        dispatchAccount({ type: 'account/login', payload: true })
        dispatchAccount({ type: 'account/fName', payload: result.user.givenName})
        dispatchAccount({ type: 'account/lName', payload: result.user.familyName })
        dispatchAccount({ type: 'account/email', payload: result.user.photoUrl })
        dispatchAccount({ type: 'account/photoURL', payload: result.user.photoUrl })

        navigateToHome()

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      debugger;
      setLoginResult("Error with google login, please sign in as guest");

      console.error("Error logging in")
      console.error(e)

      return { error: true };
    }
  }

  /*
  debugger;
  const initAsync = async () => {
    await GoogleSignIn.initAsync({
    });
    this._syncUserWithStateAsync();
  };
  initAsync();
*/
  const facebookLoginClick = () => {
/*
    firebase.auth().signInWithCredential(facebookCred)
       .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log("facebook button click")
      // The signed-in user info.
      debugger;
      var user = result.user;
      dispatchAccount({ type: 'account/login', payload: true })
      dispatchAccount({ type: 'account/name', payload: user.displayName })
      dispatchAccount({ type: 'account/email', payload: user.email })
      navigation.navigate("HomeScreen")
    }).catch(function(error) {
      debugger;
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.error(error)
      // ...
    });
    */
  }
  /*
  const signInGoogleAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
  //const cred = firebase.auth.GoogleAuthProvider.credential(googleIdToken, googleAccessToken);
*/
  
  const googleLoginOnClick = () =>{
    signInWithGoogleAsync();
    /*
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: `967944969087-8l43mueeeg97trtt5aa5u42pe7on7qev.apps.googleusercontent.com`,
      androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,


    });
    if (type === 'success') {
      // Then you can use the Google REST API
      let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
    */
    //signInGoogleAsync();

    /*
    console.log("google button cluck")

    firebase.auth().signInWithCredential(googleCred)
      .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    dispatchAccount({ type: 'account/login', payload: true })
    dispatchAccount({ type: 'account/name', payload: user.displayName })
    dispatchAccount({ type: 'account/email', payload: user.email })
    navigation.navigate("HomeScreen")
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.error(error)
    // ...
  });
  */
}
  if(fastGoogleLogin){
    googleLoginOnClick();

  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validate() {

    if (validateEmail(email)) {
      $result.text(email + " is valid :)");
      $result.css("color", "green");
    } else {
      $result.text(email + " is not valid :(");
      $result.css("color", "red");
    }
    return false;
  }

  const guestLoginOnClick = (event) => {
    
    navigation.navigate("HomeScreen");

  }
  if (fastGuestLogin){
    guestLoginOnClick();
  }

  const signInOnClick = (event) => {
    console.log(email);

    
    if (validateEmail(email)) {
      dispatchAccount({ type: "account/login", payload: true })
      dispatchAccount({ type: "account/name", payload: email })
      navigateToHome()

    } else {

      setLoginResult("Not a real email");
    }
  }
  return (

    <View style={styles.container}>
      <Image
        source={require('../../../assets/login_person.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Sign in to Continue</Text>
      <LoginInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <LoginInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <Text style={{ color: "red" }}>
      {loginResult}
      </Text>

      <LoginButton
        buttonTitle="Sign In"
        onClick={signInOnClick}
      />
      <LoginButton
        buttonTitle="Guest Login"
        onClick={guestLoginOnClick}
      />
      <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <LoginSocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {facebookLoginClick() }}
      />
      <LoginSocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {googleLoginOnClick() }}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.navButtonText} >
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    color: '#051d5f',

  },
  navButton: {
    marginTop: 10,
  },
  forgotButton: {
    marginVertical: 10,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});

export default LoginScreen;
