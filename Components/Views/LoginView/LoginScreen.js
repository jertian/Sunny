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
const GUESTLOGINSCREEN = "HomeScreen";
const isGuestButtonEnabled = false;
//BlackListScreen //IngredientListScreen //PreferencesScreen
//HomeScreen DataScreen

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const CLIENT_ID = "967944969087-igc0ds2nch2bjkb375h3opot65pela5g.apps.googleusercontent.com"
  const ANDROID_CLIENT_ID = "967944969087-bs2s7470jbft6scjau1fajhjcs5tkltb.apps.googleusercontent.com"
  const IOS_CLIENT_ID = "967944969087-6b4do4v4ffsfb5qldjp462md0edasaej.apps.googleusercontent.com"
  const dispatchAccount = useDispatch()
  const dispatchPreferences = useDispatch()
  const dispatchProducts = useDispatch()

  function dispatchBasedOnServerResponse(response) {
    dispatchAccount({ type: 'account/login', payload: true })
    dispatchAccount({ type: 'account/loginMethod', payload: response.user.loginMethod })
    dispatchAccount({ type: 'account/passwordHash', payload: response.user.passwordHash })
    dispatchAccount({ type: 'account/firstName', payload: response.user.firstName })
    dispatchAccount({ type: 'account/lastName', payload: response.user.lastName })
    dispatchAccount({ type: 'account/email', payload: response.user.userID })
    dispatchAccount({ type: 'account/userID', payload: response.user.userID })
    dispatchAccount({ type: 'account/photoURL', payload: response.user.photoUrl })
    dispatchPreferences({ type: 'preferences/update', preference: "Vegan", payload: response.user.isAVegan })
    dispatchPreferences({ type: 'preferences/update', preference: "Vegetarian", payload: response.user.isAVegetarian })
    dispatchPreferences({ type: 'preferences/blacklist/update', payload: response.user.blackList })
    dispatchProducts({ type: 'product/productListHistory/replaceAll', payload: response.user.scannedHistory })
    dispatchPreferences({ type: 'preferences/ingredientsToAvoid/update', payload: response.user.ingredientsToAvoid })
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
        result.userID = result.user.email;
        serverInfo.callServer("POST", "loginViaGoogle", result, (response) => {

          if (response.type && response.type === "success") {
            dispatchBasedOnServerResponse(response)

            navigateToHome()
          }

          else {
            setLoginResult("Error with google login, please sign up/in via email");
          }
        }

        );
      }
    
    } catch (e) {
      debugger;
      setLoginResult("Error with google login, please sign up/in via email");

      console.error("Error logging in")
      console.error(e)

      return { error: true };
    }
  }


  async function facebookLoginClick() {
    try {
      await Facebook.logInWithReadPermissionsAsync('358619188541535', {
        permissions: ['public_profile'],
      })

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log("facebook button click")
      // The signed-in user info.
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

  async function guestLoginOnClick(event) {
    try {
      let body = {
        "userID": "jamesvachao1@gmail.com",
        "password": "abc123"
      }
      serverInfo.callServer("POST", "login", body, (response) => {

        response.user.loginMethod = "email"
        dispatchBasedOnServerResponse(response)

        navigation.reset({
          index: 0,
          routes: [{ name: GUESTLOGINSCREEN }],
        });
      }
      )
   
    }
    catch (e) {
      console.error("Error with guest login");
      console.error(e);
    }

  }
  if (fastGuestLogin) {
    guestLoginOnClick();
  }


  function navigateToHome() {

    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }
  const signInViaEmailOnClick = (event) => {
    if (validateEmail(email)) {
      let body = {
        "userID": email,
        "password": password
      }
      serverInfo.callServer("POST", "login", body, (response) => {
        if (response.type == "success") {
          dispatchBasedOnServerResponse(response)
          navigateToHome()

        }
        else{
          setLoginResult("login result unsucessful: " + response.msg)
        }
      });

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
        onClick={signInViaEmailOnClick}
      />
      {isGuestButtonEnabled &&
        <LoginButton
          buttonTitle="Guest Login"
          onClick={guestLoginOnClick}
        />
      }
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
        onPress={() => {debugger;navigation.navigate('SignUpScreen')}}>
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
