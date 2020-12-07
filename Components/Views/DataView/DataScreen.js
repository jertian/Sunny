import { NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity,Image, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit'


const ThemeContext = React.createContext("light");

const DataScreen = ({navigation}) => {
  const data = {
    labels: ['Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5', 'Trip 6'],
    datasets: [{
      data: [ 20, 45, 28, 80, 99, 43 ],
    }],
    legend: ["Green House Gas Emissions"] // optional
  }

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(	250, 185, 25, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Account Purchase History
      </Text>
      <Text style={styles.text}>
        This page allows you to see your green house emission over time. 
      </Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width-50} // from react-native
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16
        }}
      />
      <Text style={styles.text}>
        The average green house gas emissions per product is 3.4
      </Text>
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
  textTitle: {
    fontSize: 28,
    marginVertical: 40,
    color: '#FFFFFF',
    fontFamily: 'Nunito_400Regular'
   
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
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

export default DataScreen;
