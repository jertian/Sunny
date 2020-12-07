import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity,Image, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux'


const ThemeContext = React.createContext("light");

const DataScreen = ({navigation}) => {
  debugger;
  const dispatchProducts = useDispatch()
  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  let l = []
  let d = []
  console.log(productsRedux.productListHistory.length)
  if (productsRedux.productListHistory.length>0){
    for (var i = 0; i<productsRedux.productListHistory.length; i++){
      l.push("Trip " + (i+1))
      d.push(productsRedux.productListHistory[i])
    }
  }
  console.log(l)
  console.log(d)
  const data = {
    labels: l,
    datasets: [{
      data: d,
    }],
    legend: ["Green House Gas Emissions"] // optional
  }

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  return (
    <View style={styles.container}>
      <Text>
        Account Purchase History
      </Text>
      {d.length> 0 &&
      <LineChart
        data={data}
        width={Dimensions.get('window').width-50} // from react-native
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      }
      {d.length == 0 &&
        <Text>
        Your history will be displayed here when you've checkout. If you're seeing this it means you have no history yet!
      </Text>
      }

      <Button title="Clear History" color = "red" onPress={() => {
        dispatchProducts({ type: 'product/productListHistory/replaceAll', payload: []})
        console.log(productsRedux.productListHistory)
      }} />
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
