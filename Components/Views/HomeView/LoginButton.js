import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';

const LoginButton = ({buttonTitle, navigation ,navigationLocation, ...rest}) => {
  return (
    
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};


export default LoginButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#E9BF9F',
    resizeMode: 'cover',
    margin: 3,
    borderRadius:10,
  },
  buttonText: {
    fontSize: 15,
    padding: 20,
    color: '#051d5f',
    justifyContent: 'center', 
    textAlign:"center"
  },

});