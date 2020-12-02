import CameraScreen from "./../Views/CameraView/CameraScreen";
import CompareScreen from "./../Views/CompareView/CompareScreen";
import DataScreen from "./../Views/DataView/DataScreen";
import DatabaseTesterScreen from "./../Views/DatabaseTesterView/DatabaseTesterScreen";
import ProductSingleScreen from "./../Views/ProductView/ProductSingleScreen";
import HomeExampleScreen from "./../Views/HomeView/HomeScreen";
import ScreenExampleScreen from "./../Views/ScreenExampleView/ScreenExampleScreen";
import ListScreen from "./../Views/ListView/ListScreen";
import LandingScreen from "./../Views/LandingView/LandingScreen";
import LoginScreen from "./../Views/LoginView/LoginScreen";
import PreferencesScreen from "./../Views/PreferenceView/PreferencesScreen";
import ServerScreen from "./../Views/ServerView/ServerScreen";
import HomeScreen from "./../Views/HomeView/HomeScreen";
import CustomHeader from "./CustomHeader";

import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect, Fragment,  } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';





const Stack = createStackNavigator();
const initialScreen = "LandingScreen";

//ProductSingleScreen //LandingScreen //Camera //HomeScreen



export default function AppWrapper() {
    let [fakeInfo, setFakeInfo] = useState(false);
    const dispatchProducts = useDispatch()
    let [isUsingCache, setIsUsingCache] = useState(false);
    let shouldUseCache = true;
    
    let compareProducts
//Testing =======================================================
//-------------------------------------------------------------------

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
        "upc": "038000016110",
    }

    compareProducts = [response1, response2];

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
}
if(!fakeInfo){
tryToFakeInfo();
setFakeInfo(true);
}

if (shouldUseCache && !isUsingCache){
const getCurrentShoppingListFromCache = async () => {
    try {
      const currentShoppingList = await AsyncStorage.getItem('@currentShoppingList')
    
      // value previously stored
      if (currentShoppingList !== null) {
        //setItemList(JSON.parse(value))
        dispatchProducts({ type: 'product/productListCurrent/replaceAll', payload: JSON.parse(currentShoppingList) })
        dispatchProducts({ type: 'product/hasRetrievedFromCache', payload: true })
      }

      const availableProductId = await AsyncStorage.getItem('@availableProductId')
      debugger;
      if (availableProductId !== null) {
        dispatchProducts({ type: 'product/availableProductId/update', payload: JSON.parse(availableProductId) })


      }
      console.log("I am using cache data")

    } catch (e) {
      console.error(e)
      // error reading value
    }
  }
  getCurrentShoppingListFromCache()
  setIsUsingCache(true)
}
    //storeData(dataList)
    //-------------------------------------------------------------------
    //Testing End =======================================================

    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName={initialScreen}
                screenOptions={{ headerLeft: null }}
            >
                <Stack.Screen
                    name="LandingScreen"
                    component={LandingScreen}
                    options={{ title: "LandingScreen" }, { headerShown: false }}
                />
                <Stack.Screen name="ScreenExample" component={ScreenExampleScreen} />
                <Stack.Screen name="ListScreen" component={ListScreen}
                    options={{
                        headerTitle: props => <CustomHeader {...props}
                            title="Scanned List" />
                    }} />

                <Stack.Screen name="LoginScreen" component={LoginScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerTitle: props => <CustomHeader {...props}
                            />
                    }} 
                />
                <Stack.Screen name="Camera" component={CameraScreen} 
                    options={{
                        headerTitle: props => <CustomHeader {...props}
                            />
                    }} 
                />
                <Stack.Screen name="DataScreen" component={DataScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Statistics" /> }}

                />
                <Stack.Screen name="PreferencesScreen" component={PreferencesScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Preferences" /> }}

                />
                <Stack.Screen name="ServerScreen" component={ServerScreen} />
                <Stack.Screen
                    name="ProductSingleScreen"
                    component={ProductSingleScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Product Screen" /> }}

                />
                <Stack.Screen
                    name="CompareScreen"
                    component={CompareScreen}
                    options={{ headerTitle: props => <CustomHeader {...props} title="Comparison" /> }}

                />
                <Stack.Screen
                    name="DatabaseTesterScreen"
                    component={DatabaseTesterScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>)
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: 'red'
    }
});