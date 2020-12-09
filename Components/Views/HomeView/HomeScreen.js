import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import ThemedButton from "../../Common/ThemedButton";
import LoginButton from "./LoginButton"
import { createStackNavigator } from "@react-navigation/stack";
const ThemeContext = React.createContext("light");
import { windowHeight, windowWidth } from '../../../utils/Dimensions';
import serverInfo from './../../Common/ServerInfo.js';

const Stack = createStackNavigator();

/*
//======================================================
Testing purposes
//======================================================
*/
let shouldNavigateOnLoad = true && serverInfo.DEBUG_MODE;
let navigateLocation = "HomeScreen"

//ProductSingleScreen //HomeScreen

function navigateOnLoad(navigation) {
  let response1 = {
    "gHGEmissions": 3.302666666666666,
    "image": "https://images.barcodelookup.com/4984/49840822-1.jpg",
    "ingredients": [
        "water",
        "sugar",
        "citric acid",
        "sodium citrate",
        "salt",
        "monopotassium phosphate",
        "modified food starch",
        "sucralose",
        "acesulfame potassium",
        "natural flavor",
        "yellow 5",
        "blue 1."
    ],
    "isFairTrade": false,
    "isSustainableBrand": false,
    "isVegan": true,
    "isVegetarian": true,
    "item": "",
    "manufacturer": "Gatorade",
    "manufacturerHeadquarters": "Chicago, Illinois, United States",
    "parentCompany": "PepsiCo",
    "subsidiaries": [],
    "upc": "052000322514",
    "warnings": []
}
let response2 = {
  "gHGEmissions": 3.1,
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
let compareProducts = [response1]
  let product = response1;
  let action = "DisplayExistingProduct";
  let type = "upc"
  let data = "038000016110"

  if (navigateLocation === "ProductSingleScreen") {
    action = "DisplayCompareProduct";
    navigation.navigate("ProductSingleScreen", { type, data, action, compareProducts });

    //navigation.navigate(navigateLocation, { action, product });
  } 
  
  if (navigateLocation === "DataScreen") {
    navigation.navigate(navigateLocation, {hasLoadedRecommendedProducts: false});

  }
  else {
    navigation.navigate(navigateLocation);

  }

}
//======================================================
//End testing code
//======================================================

export default function HomeScreen({ navigation }) {
  const selectAccount = state => state.account;
  const account = useSelector(selectAccount);
  let [fakeInfo, setFakeInfo] = useState(false);

  let compareProducts
  //Testing =======================================================
  //-------------------------------------------------------------------
  /*
  function tryToFakeInfo() {
    let response = {
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
        "upc": "016000275287",
  
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
        "upc": "030000010402",
  
    }
  
    let response2 = {
        "gHGEmissions": 3.1,
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
        "upc": "038000016110",
    }
  
    compareProducts = [response1, response2];
    navigation.navigate("CompareScreen", {compareProducts})
    
  
    /*
    let dataList = [response, response1, response2]
    const storeData = async (dataList) => {
        try {
            await AsyncStorage.setItem('@currentShoppingList', JSON.stringify(dataList))
            await AsyncStorage.setItem('@currentShoppingListCount', JSON.stringify(dataList.length))
  
        } catch (e) {
            console.log("Stored data sucessful")
            // saving error
        }
    }
    */
  /*
 }
 if(!fakeInfo){
 tryToFakeInfo();
 setFakeInfo(true);
 }
 */
  if (shouldNavigateOnLoad) {
    navigateOnLoad(navigation)
  }
  return (
    <View style={styles.container}>

      <Image
        source={require('../../../assets/shoppers_icon.png')}
        style={styles.bigGraph}
      />

      <TouchableOpacity onPress={() => {
        let shouldCompare = false;
        let compareProducts = [];
        navigation.navigate("Camera", { shouldCompare, compareProducts })
      }}>
        <Image
          source={require('../../../assets/barcodefancy_icon.png')}
          style={styles.bigLogo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PreferencesScreen")}>
        <Image
          source={require('../../../assets/orange_preferences.png')}
          style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("DataScreen", {hasLoadedRecommendedProducts: false})}>
        <Image
          source={require('../../../assets/orange_data.png')}
          style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        let productToAdd = null;
        debugger;
        navigation.navigate("ListScreen", {})
      }
      }>
        <Image
          source={require('../../../assets/orange_item.png')}
          style={styles.logo} />
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    height: 90,
    width: 100,
    resizeMode: 'cover',
    margin: 7,
    borderRadius: 10,
  },
  bigLogo: {
    height: 90,
    width: 300,
    resizeMode: 'cover',
    margin: 7,
    borderRadius: 10,
  },
  bigGraph: {
    height: 350,
    width: 500,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 90,
  },
});


