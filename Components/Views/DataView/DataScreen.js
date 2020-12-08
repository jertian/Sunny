import { NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Button, TouchableOpacity,Image, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import serverInfo from './../../Common/ServerInfo.js';


const ThemeContext = React.createContext("light");

const DataScreen = ({navigation}) => {
  const dispatchProducts = useDispatch()
  const selectProduct = state => state.products;
  const selectAccount = state => state.account;
  const accountRedux = useSelector(selectAccount);
  const productsRedux = useSelector(selectProduct);

  async function pushDB(data){
    try {
      console.log("calling server at : " + serverInfo.path + "/updateUserHistory")
      console.log("user: " + accountRedux.userID)
      //let res = await fetch(serverInfo.path + "/JamesTest", {
      let res = await fetch(serverInfo.path + "/updateUserHistory", {

        method: "POST",
        //mode: 'no-cors', // no-cors, *cors, same-origin, cors

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: accountRedux.userID,
          history: data,
        }),
      });
      let response = await res.json();
      console.log(response)
    } catch (e) {
      console.error(e);
    }
  }

  let l = []
  let d = []
 // console.log(productsRedux.productListHistory.length)
  pushDB(productsRedux.productListHistory)

  if (productsRedux.productListHistory.length>0){
    for (var i = 0; i<productsRedux.productListHistory.length; i++){
      l.push("Trip " + (i+1))
      d.push(productsRedux.productListHistory[i])
    }
  }
 // console.log(l)
 // console.log(d)
  const data = {
    labels: l,
    datasets: [{
      data: d,
    }],
    legend: ["Average GH Emissions"] // optional
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
      {d.length> 0 &&
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
      }
      {d.length == 0 &&
        <Text>
        Your history will be displayed here when you've checkout. If you're seeing this it means you have no history yet!
      </Text>
      }

      <Button title="Clear History" color = "red" onPress={() => {
        dispatchProducts({ type: 'product/productListHistory/clear'})
        console.log(productsRedux.productListHistory)
      }} />
      <Button title="Clear Recent" color = "red" onPress={() => {
        dispatchProducts({ type: 'product/productListHistory/pop'})
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
