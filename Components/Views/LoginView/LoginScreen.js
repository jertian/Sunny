import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity,Image, Text, StyleSheet } from "react-native";
import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton"
import LoginSocialButton from "./LoginSocialButton"
import { useFonts, Nunito_400Regular} from '@expo-google-fonts/nunito';

const ThemeContext = React.createContext("light");

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });


  return (

    <View style={styles.container}>
      <Image
        source={require('../../../assets/sun_blob.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Sunny Scanner</Text>
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

      <LoginButton
        buttonTitle="Sign In"
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <LoginSocialButton 
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />
      
      <LoginSocialButton 
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
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
    color: '#051d5f',
    fontFamily: 'Nunito_400Regular'
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

export default LoginScreen;
