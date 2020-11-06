import React, { useState, useEffect } from "react";
import { View, Button, Text,StyleSheet,TouchableOpacity,Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeExampleScreen from "./../HomeView/HomeScreen";


const ThemeContext = React.createContext("light");
const Stack = createStackNavigator();


function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1,flexDirection: 'column',justifyContent: "center", backgroundColor: "white"}}>
      <Text style = {styles.title}>sunny scanner</Text>
      <Text style = {styles.text}>take the step to a more responsible shopping experience </Text>
      <ThemeContext.Provider value="light">
        <Button 
          color= "black"
          title="get started"
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <TouchableOpacity activeOpacity={0.95} style={styles.button}></TouchableOpacity>
        <Image 
        source={require('../../../assets/sun_blob2.png')}
        style={styles.image} />
      </ThemeContext.Provider>

    </View>
    
    
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 40, 
    height: 60,
    textAlign: 'center',


  },
  text: {
    color: 'black',
    fontSize: 13, 
    height: 70,
    textAlign: 'center',
    marginTop: 0,

  },
  button: {
    color: 'black',
    fontSize: 13, 
    height: 100,
    marginTop: 0,
    textAlign: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },


  
});

export default LandingScreen;
