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
import serverInfo from './../../Common/ServerInfo.js';





const LoginScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const dispatchAccount = useDispatch()
  const dispatchPreferences = useDispatch()
  const dispatchProducts = useDispatch()
  function navigateToHome(){

    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }

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

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const signUpOnClick = (event) => {
    if (validateEmail(email)) {
      if(password === confirmPassword){
      let body = {
        "userID": email,
        "password": password,
        "firstName" : firstName,
        "lastName" : lastName

      }
      serverInfo.callServer("POST", "registerUser", body, (response) => {
        if (response.type == "success") {
          dispatchBasedOnServerResponse(response)
          navigateToHome()

        }
        else{
          setLoginResult("signup result unsucessful: " + response.msg)
        }
      });
    }
      else{
        setLoginResult("passwords are not equal");

      }

    } else {
      setLoginResult("Not a real email");
    }
  }
  return (

    <View style={styles.container}>
      <Text style={styles.text}>Let's get you signed up</Text>
      <Text style={styles.smallText}>The first step to making a change is deciding to start</Text>

      <LoginInput
        labelValue={firstName}
        onChangeText={(firstName) => setFirstName(firstName)}
        placeholderText="First Name"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <LoginInput
        labelValue={lastName}
        onChangeText={(lastName) => setLastName(lastName)}
        placeholderText="Last Name"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />
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
       <LoginInput
        labelValue={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <Text style={{ color: "red" }}>
      {loginResult}
      </Text>

      <LoginButton
        buttonTitle="Sign Up"
        onClick={signUpOnClick}
      />


      <LoginSocialButton
        buttonTitle="Already have an acount? Sign In Here"
        btnType="sign-in"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => navigation.navigate('LoginScreen')}
      ></LoginSocialButton>

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
  smallText: {
    fontSize: 13,
    marginBottom: 30,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 10,
  },

  navButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
});

export default LoginScreen;