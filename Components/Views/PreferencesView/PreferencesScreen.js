import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity,Image, Text, StyleSheet } from "react-native";
import LoginButton from "./LoginButton"

const ThemeContext = React.createContext("light");

const PreferencesScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return (

    <View style={styles.container}>

      <Text style={styles.text}>Set Your Preferences</Text>


      <LoginButton
        buttonTitle="Vegetarian"
      />
       <LoginButton
        buttonTitle="Vegan"
      />
       <LoginButton
        buttonTitle="GMO"
      />
       <LoginButton
        buttonTitle="Plastic Content"
      />
       <LoginButton
        buttonTitle="Water Consumption"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fab919',
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
    color: '#FFFFFF',
    fontFamily: 'nunito'
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

export default PreferencesScreen;
