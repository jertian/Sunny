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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/Views/HomeView/HomeScreen"
import CustomHeader from "./Components/Common/CustomHeader";

const Stack = createStackNavigator();




store.dispatch({type: 'preferences/update', preference: "PeanutAllergy", payload: true})

function LogoTitle() {
  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row'
      }}>
    <Text
      style={{ width: 50, height: 50, marginRight:'auto' }}
    >Left</Text>
    <Text style = {{flex: 1, textAlign: 'center' }}>Middle</Text>
    <Text style={{marginLeft: 'auto'}}>Right</Text>
    </View>
  );
}

export default function App() {



  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <AppWrapper></AppWrapper>
      </Provider>

  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
