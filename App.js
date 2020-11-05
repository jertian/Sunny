import "react-native-gesture-handler";
import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CameraScreen from "./Components/Views/CameraView/CameraScreen";
import ProductSingleScreen from "./Components/Views/ProductView/ProductSingleScreen";
import HomeExampleScreen from "./Components/Views/HomeExampleView/HomeExampleScreen";
import ScreenExampleScreen from "./Components/Views/ScreenExampleView/ScreenExampleScreen";
import DatabaseTesterScreen from "./Components/Views/DatabaseTesterView/DatabaseTesterScreen";
import ListScreen from "./Components/Views/ListView/ListScreen";
import LandingScreen from "./Components/Views/LandingView/LandingScreen";
import LoginScreen from "./Components/Views/LoginView/LoginScreen";
import DataScreen from "./Components/Views/DataView/DataScreen";
import PreferencesScreen from "./Components/Views/PreferencesView/PreferencesScreen";
<<<<<<< Updated upstream
import ServerScreen from "./Components/Views/ServerView/ServerScreen";

=======
<<<<<<< HEAD
import HomeScreen from "./Components/Views/HomeView/HomeScreen";
=======
import ServerScreen from "./Components/Views/ServerView/ServerScreen";

>>>>>>> 9b67f2ca2d2bee8d6df9121cd8bc36fd85ef0cc6
>>>>>>> Stashed changes

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ title: "LandingScreen" }, {headerShown: false}}
          />
          <Stack.Screen name="ScreenExample" component={ScreenExampleScreen} />
<<<<<<< HEAD
          <Stack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeExampleScreen" component={HomeExampleScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DataScreen" component={DataScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} options={{ headerShown: false }} />
=======
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeExampleScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="DataScreen" component={DataScreen} />
          <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
          <Stack.Screen name="ServerScreen" component={ServerScreen} />

<<<<<<< Updated upstream
=======
>>>>>>> 9b67f2ca2d2bee8d6df9121cd8bc36fd85ef0cc6
>>>>>>> Stashed changes
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
