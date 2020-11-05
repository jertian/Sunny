import React, { useState, useEffect } from "react";
import { View, Button, Text,StyleSheet,TouchableOpacity,Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeExampleScreen from "../HomeExampleView/HomeExampleScreen";



const ThemeContext = React.createContext("light");
const Stack = createStackNavigator();


function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1,flexDirection: 'column',justifyContent: "center", backgroundColor: '#FBFFF1'}}>
      <Text style = {styles.title}>sunny scanner</Text>
      <Text style = {styles.text}>take the step to a more responsible shopping experience </Text>
      <ThemeContext.Provider value="light">
        <Button 
          color= "#A3A3A3"
          title="get started"
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <TouchableOpacity activeOpacity={0.95} style={styles.button}></TouchableOpacity>
        <Image 
        source={require('../../../assets/yellow_blob.png')}
        style={styles.yellow_blob} />
        <Image 
        source={require('../../../assets/pink_blob.png')}
        style={styles.pink_blob} />
         
      </ThemeContext.Provider>

    </View>
    
    
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#D0B580',
    fontSize: 40, 
    height: 60,
    textAlign: 'center',
  },
  text: {
    color: '#A3A3A3',
    fontSize: 13, 
    height: 20,
    textAlign: 'center',

  },
  button: {
    fontSize: 13, 
    height: 0,
    marginTop: 0,
  },
  pink_blob: {
    height: 250,
    width: 250,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end', 
    marginTop: 60,
  },
  yellow_blob: {
    height: 100,
    width: 50,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end', 
  },


  
});

export default LandingScreen;
