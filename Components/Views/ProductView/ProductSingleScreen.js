
import React, { Fragment, useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal} from "react-native";
import { List } from 'react-native-paper';
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import AddItem from "./AddItem"
import serverInfo from './../../Common/ServerInfo.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from "react-native-reanimated";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./../../Common/Firebase/firebase";

var products = []
const DISPLAY_EXISTING_PRODUCT = "DisplayExistingProduct"
const DISPLAY_SCANNED_PRODUCT = "DisplayScannedProduct"
const DISPLAY_COMPARE_PRODUCT = "DisplayCompareProduct"


export default function ProductSingleScreen({ route, navigation }) {
  const [isWaitingOnInfo, setIsWaitingOnInfo] = useState(true);
  const [isWaitingOnCompareInfo, setIsWaitingOnCompareInfo] = useState(true);
  const [displayAlert, setDisplayAlert] = useState(false);
  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  const selectAccount = state => state.account;
  const accountRedux = useSelector(selectAccount);
  let [isCacheLoaded, setIsCacheLoaded] = useState(false);
  let [hasFinishedScanning, setHasFinishedScanning] = useState(false);
  //let [hasActionBeenTaken, setHasActionBeenTaken] = useState(false);

  const [currentShoppingList, setCurrentShoppingList] = useState([]);

  if (!isCacheLoaded && productsRedux.shouldRetrieveFromCache && productsRedux.hasRetrievedFromCache) {
    setCurrentShoppingList(productsRedux.productListCurrent)
    setIsCacheLoaded(true)
  }

  const [info, setInfo] = useState({
    scanned: false, gHGEmissions: 0, image: "", ingredients: [],
    isVegan: false, isVegetarian: false, item: "",
    manufacturer: "", parentCompany: "",subsidiaries:"",manufacturerHeadquarters:"", upc: "", isFairTrade: false, isSustainableBrand: false,
    warnings:[],
  });


  /*
  action must not be null when navigating to product screen
  possible string results are: 
    "DisplayExistingProduct" : sent a product in params to just display
    "DisplayScannedProduct" : sent a upc to process to display
    "DisplayCompareProduct" : sent a upc to process to display with option to compare
  */

  let { action } = route.params;
  let { data } = route.params;
  let { type } = route.params;
  let { name } = route.params;
  let { product } = route.params;
  let { compareProducts } = route.params;

  let response;
  //Change this once, it is called when either a product is loaded or data from server retrieved
  function setInfoFromResponse(response) {
    setInfo({
      scanned: true,
      gHGEmissions: Math.round(parseFloat(response.gHGEmissions)),
      image: response.image,
      ingredients: response.ingredients,
      isVegan: response.isVegan,
      isVegetarian: response.isVegetarian,
      item: response.item, //name
      manufacturer: response.manufacturer,
      parentCompany: response.parentCompany,
      subsidiaries:response.subsidiaries,
      upc: response.upc,
      isFairTrade: response.isFairTrade,
      isSustainableBrand: response.isSustainableBrand,
      manufacturerHeadquarters: response.manufacturerHeadquarters,
      warnings: response.warnings,
    })
    setHasFinishedScanning(true);
  }

  async function getInfo() {
    try {
      console.log("calling server at : " + serverInfo.path + "/scannedCode")
        //let res = await fetch(serverInfo.path + "/JamesTest", {
        let res = await fetch(serverInfo.path + "/scannedCode", {
        //let res = await fetch(serverInfo.path + "/paulinaTest", {
        method: "POST",
        //mode: 'no-cors', // no-cors, *cors, same-origin, cors

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: accountRedux.userID,
          codeType: "",
          code: data,
        }),
      });
      let response = await res.json();





      //Testing =======================================================
      //-------------------------------------------------------------------

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

      let responses = [response0, response1, response2]
      //let response = responses[Math.floor(Math.random() * 3)];
      //response = response2;
      
      //let response = responses[productsRedux.productListCurrent.length];
      //let response = response2;
      //-------------------------------------------------------------------
      //Testing End =======================================================


      console.log(response);
      setInfoFromResponse(response); //defined at the beginning

    } catch (e) {
      console.error(e);
    }
  }

  if (action !== "") {
    setHasFinishedScanning(false)

    if (action === DISPLAY_COMPARE_PRODUCT && compareProducts && compareProducts.length > 0) {
      setInfo({
        scanned: false, gHGEmissions: 0, image: "", ingredients: [],
        isVegan: false, isVegetarian: false, item: "",
        manufacturer: "", parentCompany: "", upc: "", isFairTrade: false, isSustainableBrand: false
      });
      getInfo()


    }
    //Check if I sent a product here from list screen
    //If i did send a product then just display it, no need to query
    //Also make sure our products is not populated because if it is, were comparing something
    if (action === DISPLAY_EXISTING_PRODUCT) {

      setInfoFromResponse(product)
    }
    if (action === DISPLAY_SCANNED_PRODUCT) {
      setInfo({
        scanned: false, gHGEmissions: 0, image: "", ingredients: [],
        isVegan: false, isVegetarian: false, item: "",
        manufacturer: "", parentCompany: "", upc: "", isFairTrade: false, isSustainableBrand: false
      });
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
    route.params.action = "";

  }

  function showAlert(infoWarnings){
    //let isEmpty = infoWarnings.length > 0
    if(typeof infoWarnings !== 'undefined' && infoWarnings.length   && displayAlert != true){
      Alert.alert(
        "Warning",
        " " + infoWarnings,
        [
          {
            text: "hi",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false })
        setDisplayAlert(true)
    }
      
      
  }


  function compare() {
    let shouldCompare = true;
    compareProducts = [];
    compareProducts.push(info);
    navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
    navigation.navigate("Camera", { shouldCompare, compareProducts })

  }

  function viewComparison() {
    compareProducts.push(info);
    navigation.navigate("CompareScreen", { compareProducts })
  }

  function addItem() {
    //dispatchProducts({ type: 'product/productListCurrent/add', payload: info })
    let productToAdd = info;
    navigation.navigate("ListScreen", { productToAdd })

  }
  function ProductImage() {
    if (info.image != "") {
      return (<Image source={{ uri: info.image }} style={styles.productImage} />)
    } else {
      return (<Image source={{ uri: "../../../assets/no_image_available.jpg" }} style={styles.productImage} />)
    }
  }
  function ScanLoadingComponent() {
    return (<View>
      <Text> Loading... </Text>
      
    </View>)

  }
  function SuccessfulProductLoadComponent() {
    return (
      <ScrollView>
    <View style={styles.container}>
    
      <ProductImage ></ProductImage>
      <View style={{ flexDirection: 'row', margin: 10, }}>
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

        {true &&
          <TouchableOpacity style={styles.greenEmission}>
            <Text style={styles.textEmission}> {info.gHGEmissions} </Text>
          </TouchableOpacity>
        }
      </View>
      <Text style={styles.text}>{data}</Text>
      <Text style={styles.text}>{info.item}</Text>
      { isCacheLoaded && <TouchableOpacity style={styles.buttonContainer} onPress={() => { addItem() }} >
        {info.item !== "" && <Text style={styles.buttonText}>add item</Text>}
      </TouchableOpacity>
      }
      <View style={{ flexDirection: 'row', margin: 10, }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { compare() }} >
          {info.item !== "" && <Text style={styles.buttonText}>compare</Text>}
        </TouchableOpacity>

        {info.item !== "" && compareProducts && compareProducts.length > 0 &&

          <TouchableOpacity style={styles.buttonContainer} onPress={() => { viewComparison() }} >
            <Text style={styles.buttonText}>view comparison</Text>
          </TouchableOpacity>
        }
        </View>
        <List.Section  style={styles.accordion}>
              
            <List.Accordion 
              titleStyle = {{color:'black'}}
              title="Parent Company"
              
              //left={props => <List.Icon {...props} icon="folder" />}
              >
              <List.Item  title={info.parentCompany} />
            </List.Accordion>

            <List.Accordion
              title="Subsidaries"
              titleStyle = {{color:'black',}}
              
              //left={props => <List.Icon {...props} icon="folder" />}
              //expanded={expanded}
              >
              
              <List.Item
                 title={<View style = {{ flexDirection: 'row' }} ><Text>{info.subsidiaries}</Text></View>}
                 titleStyle = {{color:'black',flexWrap: 'wrap'  }}
                 descriptionNumberOfLines={5}
              />
            </List.Accordion>
            <List.Accordion
              title="Headquarters"
              titleStyle = {{color:'black'}}
              //left={props => <List.Icon {...props} icon="folder" />}
              //expanded={expanded}
              >
              <List.Item title={info.manufacturerHeadquarters} />
            </List.Accordion>
        </List.Section>
        
      </View>
      {showAlert(info.warnings)}
      
    
    </ScrollView>
    )
  }
  function ScanFailComponent() {
    return (      <Fragment>
      <Text style={{ color: 'red', fontSize: 30 }} >Could not find item via scraping or APIs, please scan another item</Text>
          <Button title="Scan Another Item" color="black" onPress={() => {
        navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
        let shouldCompare = false;
        let compareProducts = [];
        navigation.navigate("Camera", {shouldCompare, compareProducts});
         }} />
         </Fragment> )
  }
  return (
    <Fragment>
      {hasFinishedScanning && info.item == "" && <ScanFailComponent />}
      {hasFinishedScanning && info.item != "" && <SuccessfulProductLoadComponent></SuccessfulProductLoadComponent>}
      {!hasFinishedScanning && <ScanLoadingComponent />}
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
    width: 250,
    resizeMode: 'contain',
    borderRadius: 10,


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

  susIcon: {
    height: 50,
    width: 50,
    margin: 7
  },
  greenEmission: {
    height: 50,
    width: 50,
    color: '#2e64e5',
    borderWidth: 5,
    borderColor: "#f19820",
    borderRadius: 50,
    alignItems: "center",
    margin: 7

  },
  textEmission: {
    fontSize: 17,
    color: "black",

    textAlign: 'left',
    paddingTop: 10,
  },
  accordion:{
    textAlign: 'center',
    color: "black",
    width: 350,
   
    
  },
  listItem:{
    height: 50,
    color: "red",
  }
  
});