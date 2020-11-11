import React, { Fragment, useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import AddItem from "./AddItem"
import serverInfo from './../../Common/ServerInfo.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from "react-native-reanimated";

var products = []

export default function ProductSingleScreen({ route, navigation }) {
  const [isWaitingOnInfo, setIsWaitingOnInfo] = useState(true);
  const [hasRetrievedCachedShoppingList, setHasRetrievedCachedShoppingList] = useState(false);
  const [currentShoppingList, setCurrentShoppingList] = useState([]);

  const [info, setInfo] = useState({
    scanned: false, gHGEmissions: 0, image: "", ingredients: [],
    isVegan: false, isVegetarian: false, item: "",
    manufacturer: "", parentCompany: "", upc: ""
  });

  console.log(route)


  let { data } = route.params;
  let { type } = route.params;
  let { name } = route.params;
  let { product } = route.params;

  //Change this once, it is called when either a product is loaded or data from server retrieved
  function setInfoFromResponse(response) {
    setInfo({
      scanned: true,
      gHGEmissions: response.gHGEmissions,
      image: response.image,
      ingredients: response.ingredients,
      isVegan: response.isVegan,
      isVegetarian: response.isVegetarian,
      item: response.item, //name
      manufacturer: response.manufacturer,
      parentCompany: response.parentCompany,
      upc: response.upc,
    })
  }

  if (hasRetrievedCachedShoppingList) {
    const getData = async () => {
      console.log("GETTING DATA");
      try {
        const value = await AsyncStorage.getItem('@currentShoppingList')

        if (value !== null) {
          setCurrentShoppingList(JSON.parse(value));
        }
      } catch (e) {
        // error reading value
        console.error(e)

      }
    }
    getData()
    setHasRetrievedCachedShoppingList(true);
  }
  async function getInfo() {
    try {

      console.log("calling server at : " + serverInfo.path + "/scannedCode")
      debugger;
      let res = await fetch(serverInfo.path + "/scannedCode", {

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
      debugger;





      //Testing =======================================================
      //-------------------------------------------------------------------
      /*
      let response0 = {
        "gHGEmissions": 3.1579166666666665,
        "image": "https://images.barcodelookup.com/3215/32152544-1.jpg",
        "ingredients": [
          "whole grain oats",
          "corn starch",
          "sugar",
          "salt",
          "tripotassium phosphate. vitamin e (mixed tocopherols) added to preserve freshness.vitamins and minerals: calcium carbonate",
          "iron and zinc (mineral nutrients)",
          "vitamin c (sodium ascorbate)",
          "a b vitamin (niacinamide)",
          "vitamin b6 (pyridoxine hydrochloride)",
          "vitamin a (palmitate)",
          "vitamin b1 (thiamin mononitrate)",
          "a b vitamin (folic acid)",
          "vitamin b12",
          "vitamin d3."
        ],
        "isFairTrade": false,
        "isSustainableBrand": false,
        "isVegan": false,
        "isVegetarian": true,
        "item": "Cheerios Cereal - 18.0 Oz",
        "manufacturer": "Cheerios",
        "parentCompany": "General Mills",
        "subsidiaries": [],
        "upc": "016000275287"
      };

      let response1 = {
        "gHGEmissions": 3.4,
        "image": "https://images.barcodelookup.com/3215/32152522-1.jpg",
        "ingredients": [
          "whole grain rolled oats."
        ],
        "isFairTrade": false,
        "isSustainableBrand": false,
        "isVegan": true,
        "isVegetarian": true,
        "item": "Quaker Old Fashioned Oats 42 Oz",
        "manufacturer": "Quaker",
        "parentCompany": "PepsiCo",
        "subsidiaries": [
          "Aunt Jemima Mills Company",
          "The Quaker Oats Company of Canada Limited",
          "Quaker Brasil Ltda.",
          "Grocery International Holdings, Inc."
        ],
        "upc": "030000010402"
      }

      let response2 = {
        "gHGEmissions": 3.1164999999999994,
        "image": "https://images.barcodelookup.com/2754/27543194-1.jpg",
        "ingredients": [
          "rice",
          "wheat gluten",
          "sugar",
          "defatted wheat germ",
          "contains 2% or less of salt",
          "whey",
          "malt flavor",
          "calcium caseinate.vitamins and minerals: vitamin c (ascorbic acid)",
          "reduced iron",
          "niacinamide",
          "vitamin b6 (pyridoxine hydrochloride)",
          "vitamin b1 (thiamin hydrochloride)",
          "vitamin b2 (riboflavin)",
          "folic acid",
          "vitamin a palmitate",
          "vitamin b12",
          "vitamin d3."
        ],
        "isFairTrade": false,
        "isSustainableBrand": true,
        "isVegan": false,
        "isVegetarian": true,
        "item": "Special K Original Breakfast Cereal - 12oz - Kellogg's",
        "manufacturer": "Special K",
        "parentCompany": "Kellogg's",
        "subsidiaries": [],
        "upc": "038000016110"
      }
      let responses = [response0, response1, response2]
      let response = responses[Math.floor(Math.random() * 3)];
      */
      //-------------------------------------------------------------------
      //Testing End =======================================================


      console.log(response);
      setInfoFromResponse(response); //defined at the beginning
      setIsWaitingOnInfo(false);

    } catch (e) {
      console.error(e);
    }
  }
  if (isWaitingOnInfo) {
    //Check if I sent a product here from list screen
    //If i did send a product then just display it, no need to query
    if (product) {
      setInfoFromResponse(product)
    }
    else {
      //Testing purpose===============
      //let data = "016000275287";
      //Testing end ==================

      if (data === "" || data === undefined) {
        data = "[data_info should be here]";
        name = "[data_info should be here]";
        type = "[type_info should be here]";
      }





      getInfo()
      //console.log("Calling get info");

    }
  }
  function compare() {
    console.log("comparing")
    products.push(JSON.stringify(info))
    console.log(products)
    navigation.navigate("Camera")
  }

  function viewComparison() {
    products.push(JSON.stringify(info))
    console.log(products)
    navigation.navigate("CompareScreen", { products })
  }

  function addItem() {
    const storeData = async (data) => {
      console.log("SETTING DATA");

      try {
        debugger;
        await AsyncStorage.setItem('@currentShoppingList', JSON.stringify(data))
        await AsyncStorage.setItem('@currentShoppingListCount', JSON.stringify(data.length))

      } catch (e) {
        // saving error
        console.error(e)
      }
    }




    info.storageId = currentShoppingList.length;
    currentShoppingList.push(info)
    storeData(currentShoppingList);
    navigation.navigate("ListScreen")









  }
  function ProductImage(){
    if(info.image != ""){
    return (<Image source={{ uri: info.image }} style={styles.productImage}/>)
    }else {
      return (  (<Image source={{ uri: "../../../assets/loading_gif.gif" }} style={styles.productImage}/>))
  }
  return (
    <Fragment>
      <View style={styles.container}>
        {/*
      <Text style={styles.textTitle}>Product Screen</Text>
        */}
        <ProductImage></ProductImage>

        <View style={{ flexDirection: 'row', margin: 10, }}>
          {/*
                    <TouchableOpacity onPress={() => { }}>
                        <Icon style={{ padding: 3 }} name="leaf" size={15} color="black" />
                    </TouchableOpacity>
*/}

          {info.isVegan &&
            <TouchableOpacity >
              <Image source={require('../../../assets/vegan.png')} style={styles.susIcon} />
            </TouchableOpacity>
          }
          {info.isVegetarian &&
            <TouchableOpacity onPress={() => { }}>
              <Image source={require('../../../assets/vegetarian.png')} style={styles.susIcon} />
            </TouchableOpacity>
          }
          {info.isFairTrade &&
            <TouchableOpacity onPress={() => { }}>
              <Image source={require('../../../assets/fair_trade.png')} style={styles.susIcon} />
            </TouchableOpacity>
          }
          {info.isSustainableBrand &&
            <TouchableOpacity onPress={() => { }}>
              <Image source={require('../../../assets/sustainable.png')} style={styles.susIcon} />
            </TouchableOpacity>
          }
        </View>

        <Text style={styles.text}>{data}</Text>
        <Text style={styles.text}>{info.item}</Text>

        {/*
         <Text>
        Bar code: {type} data {data} has been scanned!
        </Text>
        <Text>

          Data: {data} has been scanned!
        </Text>
        <Text>
          Info: {info.gHGEmissions}, {info.image}, {info.ingredients}, {info.isVegan}, {info.isVegetarian}, {info.item}
          {info.manufacturer}, {info.parentCompany}, {info.upc}, 
        </Text>
        
        
        */}



        <TouchableOpacity style={styles.buttonContainer} onPress={() => { addItem() }} >
          <Text style={styles.buttonText}>add item</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', margin: 10, }}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => { compare() }} >
            <Text style={styles.buttonText}>compare</Text>
          </TouchableOpacity>

          {products.length > 0 &&

            <TouchableOpacity style={styles.buttonContainer} onPress={() => { viewComparison() }} >
              <Text style={styles.buttonText}>view comparison</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </Fragment>
  );


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,

  },
  buttonContainer: {
    height: 40,
    width: 150,
    backgroundColor: "#f19820",
    resizeMode: 'cover',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  productImage: {
    height: 300,
    width: 150,
    //resizeMode: 'cover',
    borderRadius: 10,
    marginTop: -80,

  },
  textTitle: {
    fontSize: 38,
    color: 'black',
    marginTop: -80,
    fontFamily: 'Nunito'
  },
  text: {
    fontSize: 25,
    color: "black",
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
  susIcon: {
    height: 50,
    width: 50,
    fontSize: 18,
    color: '#2e64e5',
    margin: 7
  },
});
