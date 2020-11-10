import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity,Image, Text, StyleSheet } from "react-native";


const ThemeContext = React.createContext("light");

const DataScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/graph_1.png')}
        style={styles.logo}
      />
       <Image
        source={require('../../../assets/graph_2.png')}
        style={styles.logo}
      />
      <Image
        source={require('../../../assets/graph_2.png')}
        style={styles.bigGraph}
      />
      <Image
        source={require('../../../assets/graph_3.png')}
        style={styles.logo}
      />
       <Image
        source={require('../../../assets/graph_4.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fab919',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    margin: 7,
    borderRadius:10,
  },
  bigGraph: {
    height: 200,
    width: 300,
    resizeMode: 'cover',
    borderRadius:10,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
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

export default DataScreen;
