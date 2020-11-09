import "react-native-gesture-handler";
import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { store } from './Components/Common/Redux/store'
import { Provider, useDispatch } from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './Components/Common/Redux/reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import firebase from "firebase/app";
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { AppLoading } from 'expo';
import  AppWrapper from './Components/Common/AppWrapper';


const fetchFonts = () => {
  return Font.loadAsync({
    'nunito': require('./assets/fonts/Nunito-ExtraBold.ttf')

  });
  };




store.dispatch({type: 'preferences/update', preference: "PeanutAllergy", payload: true})


export default function App() {



  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

    return (
        <Provider store={store}>
          <AppWrapper>
     
     </AppWrapper>
      </Provider>
    );
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
