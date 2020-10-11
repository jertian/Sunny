import "react-native-gesture-handler";
import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CameraScreen from "./Components/Views/CameraView/CameraScreen";
import ProductSingleScreen from "./Components/Views/ProductView/ProductSingleScreen";
import HomeScreen from "./Components/Views/HomeView/HomeScreen";
import ScreenExample from "./Components/Views/ScreenExampleView/ScreenExampleScreen";
import DatabaseTesterScreen from "./Components/Views/DatabaseTesterView/DatabaseTesterScreen";
import ListScreen from "./Components/Views/ListView/ListScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen name="ScreenExample" component={ScreenExample} />
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
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
