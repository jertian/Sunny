import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Platform, Button, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton"
import LoginSocialButton from "./LoginSocialButton"
import { useSelector, useDispatch } from 'react-redux'
import "firebase/firestore";
import firebase from "firebase/app";
import { firebaseConfig } from "./../../Common/Firebase/firebase"
//import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import serverInfo from './../../Common/ServerInfo.js';

import { StackActions, NavigationActions } from 'react-navigation';


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
  CLIENT_ID = "967944969087-igc0ds2nch2bjkb375h3opot65pela5g.apps.googleusercontent.com"
  ANDROID_CLIENT_ID = "967944969087-bs2s7470jbft6scjau1fajhjcs5tkltb.apps.googleusercontent.com"
  IOS_CLIENT_ID = "967944969087-6b4do4v4ffsfb5qldjp462md0edasaej.apps.googleusercontent.com"
  const dispatchAccount = useDispatch()
  const dispatchPreferences = useDispatch()
  const dispatchProducts = useDispatch()

  function navigateToHome() {

    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }
  async function signInWithGoogleAsync() {
    try {

      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        clientId: CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {

        //Based on platform we need to verify with a certain client ID
        if (Platform.OS === 'ios') {
          result.CLIENT_ID = IOS_CLIENT_ID
        }
        else if (Platform.OS === 'android') {
          result.CLIENT_ID = ANDROID_CLIENT_ID

        } else {
          result.CLIENT_ID = CLIENT_ID
        }
        debugger;
        let res = await fetch(serverInfo.path + "/verifyGoogleLogin", {

          method: "POST",
          //mode: 'no-cors', // no-cors, *cors, same-origin, cors

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        });
        let response = await res.json();
        debugger;

        if (response.result && response.result === "success") {
          dispatchAccount({ type: 'account/login', payload: true })
          dispatchAccount({ type: 'account/fName', payload: result.user.givenName })
          dispatchAccount({ type: 'account/lName', payload: result.user.familyName })
          dispatchAccount({ type: 'account/email', payload: result.user.photoUrl })
          dispatchAccount({ type: 'account/photoURL', payload: result.user.photoUrl })
          dispatchPreferences({ type: 'preferences/update', preference: "Vegan", payload: response.user.isAVegan })
          dispatchPreferences({ type: 'preferences/update', preference: "Vegetarian", payload: response.user.isAVegetarian })
          dispatchPreferences({ type: 'preferences/blacklist/update',  payload: response.user.blackList })
          //REMOVE IN FINAL VERSION
          if(response.user.chemicalsToAvoid){
            dispatchPreferences({ type: 'preferences/chemicalsToAvoid/update',  payload: response.user.chemicalsToAvoid })
          }
          navigateToHome()
        }
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
  async function facebookLoginClick() {
    debugger;
    try {
      await Facebook.logInWithReadPermissionsAsync('358619188541535', {
        permissions: ['public_profile'],
      })

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
    }
    catch (error) {
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
    }

  }
  const googleLoginOnClick = () => {
    signInWithGoogleAsync();

  }
  if (fastGoogleLogin) {
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
  if (fastGuestLogin) {
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
      {/*
      <LoginSocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {facebookLoginClick() }}
      />
      */}
      <LoginSocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => { googleLoginOnClick() }}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
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
