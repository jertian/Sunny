import "react-native-gesture-handler";
import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CameraScreen from "./Components/Views/CameraView/CameraScreen";
import ProductSingleScreen from "./Components/Views/ProductView/ProductSingleScreen";
import HomeExampleScreen from "./Components/Views/HomeView/HomeScreen";
import ScreenExampleScreen from "./Components/Views/ScreenExampleView/ScreenExampleScreen";
import DatabaseTesterScreen from "./Components/Views/DatabaseTesterView/DatabaseTesterScreen";
import ListScreen from "./Components/Views/ListView/ListScreen";
import LandingScreen from "./Components/Views/LandingView/LandingScreen";
import LoginScreen from "./Components/Views/LoginView/LoginScreen";
import DataScreen from "./Components/Views/DataView/DataScreen";
import PreferencesScreen from "./Components/Views/PreferenceView/PreferencesScreen";
import ServerScreen from "./Components/Views/ServerView/ServerScreen";
import HomeScreen from "./Components/Views/HomeView/HomeScreen";
import { store } from './Components/Common/Redux/store'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './Components/Common/Redux/reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const Stack = createStackNavigator();



store.dispatch({type: 'preferences/update', preference: "PeanutAllergy", payload: true})


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Provider store={store}>
 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ title: "LandingScreen" }, {headerShown: false}}
          />
          <Stack.Screen name="ScreenExample" component={ScreenExampleScreen} />
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="DataScreen" component={DataScreen} />
          <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
          <Stack.Screen name="ServerScreen" component={ServerScreen} />
          <Stack.Screen
            name="ProductSingleScreen"
            component={ProductSingleScreen}
          />
          <Stack.Screen
            name="DatabaseTesterScreen"
            component={DatabaseTesterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
