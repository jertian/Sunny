import React, {Fragment, useState, useEffect } from "react";
import {Button, View, Text,StyleSheet,Image } from "react-native";
import { useFonts, Nunito_400Regular} from '@expo-google-fonts/nunito';
import { AppLoading} from 'expo';
import * as Font from 'expo-font'
import AddItem from "./AddItem"
import serverInfo from './../../Common/ServerInfo.js';

var products = []

export default function ProductSingleScreen({ route, navigation }) {
  let { data } = route.params;
  let { type } = route.params;
  let { name } = route.params;

  if (data === "" || data === undefined) {
    data = "[data_info should be here]";
    name = "[data_info should be here]";
    type = "[type_info should be here]";
  }


  const [fontsLoaded, setFontLoaded] = useState(false);
  const [info, setInfo] = useState({scanned: false, Emissions:0, image: "", ingredients: [], 
                                      isVegan: false, isVegetarian: false, item: "", 
                                      manufacturer: "", parentCompany: "", upc: ""});

  Font.loadAsync({
    'Nunito': require('../../../assets/fonts/Nunito-Regular.ttf')
  }).then(() => setFontLoaded(true));

  async function getInfo () {
    try {
      let res = await fetch(serverInfo.path + "/test", {

        method: "POST",
        //mode: 'no-cors', // no-cors, *cors, same-origin, cors

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeType: "",
          code: data,
        }),
      });
      let response = await res.json();
      console.log(response);
      setInfo({
        scanned: true,
        Emissions: response.gHGEmissions,
        image: response.image,
        ingredients: response.ingredients,
        isVegan: response.isVegan,
        isVegetarian: response.isVegetarian,
        item: response.item,
        manufacturer: response.manufacturer,
        parentCompany: response.parentCompany,
        upc: response.upc
      })
    } catch (e) {
      console.error(e);
    }
  }

  if (!info.scanned && !fontsLoaded) {
    getInfo()
  } else {
    console.log("waiting")
  }

  function compare() {
    console.log("comparing")
    products.push(JSON.stringify(info))
    console.log(products)
    navigation.pop()
    navigation.navigate("Camera")
  }

  function viewComparison(){
    products.push(JSON.stringify(info))
    console.log(products)
    navigation.pop()
    navigation.navigate("CompareScreen", { products })
  }

  function addItem(){
    let item = info.item
    let upc = info.upc
    let image = info.image
    navigation.navigate("ListScreen", { item, upc, image })
  }

  if (!fontsLoaded) {
    return <AppLoading / >
  }

    return (
      <Fragment>
      <View style={styles.container}>
      <Text style={styles.textTitle}>Product Screen</Text>
        <Image
          source={require('../../../assets/sun_blob.png')}
          style={styles.productImage}
        />
        <Text style={styles.text}>{data}</Text>
        <Text>
        Bar code with type {type} and data {data} has been scanned!
        Info: {info.Emissions}, {info.image}, {info.ingredients}, {info.isVegan}, {info.isVegetarian}, {info.item}
        {info.manufacturer}, {info.parentCompany}, {info.upc}, 
      </Text>
        <Button
          title={"Add Item"}
          onPress={() => {
            addItem()
          }}
        />
        <Button
          title={"Compare"}
          onPress={() => {
            compare()
          }}
        />
        
        {products.length>0 && 
          <Button
           title={"View Comparisons"}
            onPress={() => {
              viewComparison()
            }}
        />}
        
      </View>
      </Fragment>
    );


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9BF9F',
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    padding: 20,
  },
  productImage: {
    height: 350,
    width: 250,
    resizeMode: 'cover',
    borderRadius:10
  },
  textTitle: {
    fontSize: 38,
    color: '#FFFFFF',
    marginTop: -100,
    fontFamily: 'Nunito'
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center'
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
