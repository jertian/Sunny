import React, { useState, useEffect } from "react";
import { View, Button, Text,StyleSheet,TouchableOpacity,Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeExampleScreen from "../HomeExampleView/HomeExampleScreen";



const ThemeContext = React.createContext("light");
const Stack = createStackNavigator();


function LandingScreen({ navigation }) {



  return (
    <View style={{ flex: 1,flexDirection: 'column',justifyContent: "center",alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <Text style = {styles.title}>sunny scanner</Text>
      <Text style = {styles.text}>take the step to a more responsible shopping experience </Text>
      <ThemeContext.Provider value="light">
        
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("HomeScreen")} >
      <Text style={styles.buttonText}>get started</Text>
      </TouchableOpacity>

      <Image 
      source={require('../../../assets/sunny_land2.png')}
      style={styles.orange} />
         
      </ThemeContext.Provider>

    </View>
    
    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    width: 100,
    backgroundColor: "#f19820",
    resizeMode: 'cover',
    borderRadius:10,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    color: '#D0B580',
    fontSize: 40, 
    height: 60,
    textAlign: 'center',
    fontFamily: 'nunito'
  },
  text: {
    color: '#A3A3A3',
    fontSize: 13, 
    height: 50,
    textAlign: 'center',
    fontFamily: 'nunito'

  },
  orange: {
    height: 405,
    width: 400,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end', 
    marginBottom: -210,
  },
  pink_blob: {
    height: 255,
    width: 250,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end', 
    marginBottom: -210,
  },
  yellow_blob: {
    height: 100,
    width: 60,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end', 
  },


  
});

export default LandingScreen;
