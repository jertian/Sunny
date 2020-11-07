import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton"
import LoginSocialButton from "./LoginSocialButton"
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { useSelector, useDispatch } from 'react-redux'
import './../../Common/Firebase/firebase'
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";

const ThemeContext = React.createContext("light");
const selectAccount = state => state.account
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/userinfo.profile');
providerGoogle.addScope('https://www.googleapis.com/auth/userinfo.email');

var providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.addScope('user_photos');
providerFacebook.setCustomParameters({
  'display': 'popup'
});

firebase.auth().languageCode = 'en';
providerGoogle.setCustomParameters({
  'login_hint': 'user@example.com'
});



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");

  const dispatchAccount = useDispatch()

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  const facebookLoginClick = () => {
    firebase.auth().signInWithPopup(providerFacebook).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      debugger;
      var user = result.user;
      dispatchAccount({ type: 'account/login', payload: true })
      dispatchAccount({ type: 'account/name', payload: user.displayName })
      dispatchAccount({ type: 'account/email', payload: user.email })
      navigation.navigate("HomeScreen")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  const googleLoginOnClick = () =>{
  firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
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
    // ...
  });
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
    navigation.navigate("HomeScreen")
  }
  const signInOnClick = (event) => {
    console.log(email);

    if (validateEmail(email)) {
      dispatchAccount({ type: "account/login", payload: true })
      dispatchAccount({ type: "account/name", payload: email })
      navigation.navigate("HomeScreen")
    } else {

      setLoginResult("Not a real email");
    }
  }
  return (

    <View style={styles.container}>
      <Image
        source={require('../../../assets/sun_blob.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Sunny Scanner</Text>
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
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    fontFamily: 'Nunito_400Regular'
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});

export default LoginScreen;
