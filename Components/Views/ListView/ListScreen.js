import React, { useState, useEffect, Fragment } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header"
import AddItem from "./AddItem"
import Icon from 'react-native-vector-icons/FontAwesome';
//import ListItem from "./ListItem"
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = React.createContext("light");


function ListScreen({ route, navigation }) {
  let { productToAdd } = route.params;
  const dispatchProducts = useDispatch()
  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  let [itemList, setItemList] = useState([]);
  let [isCacheLoaded, setIsCacheLoaded] = useState(false);
  useEffect(() => {
    if (itemList != productsRedux.productListCurrent) {
      storeData(itemList);
      dispatchProducts({ type: 'product/productListCurrent/replaceAll', payload: itemList })
    }
  });
  const storeData = async (data) => {
    try {
      debugger;
      await AsyncStorage.setItem('@currentShoppingList', JSON.stringify(data))
      await AsyncStorage.setItem('@availableProductId', JSON.stringify(productsRedux.availableProductId))
      console.log("Stored data in cache sucessful")

    } catch (e) {
      console.error(e)
      // saving error
    }
  }

  if (!isCacheLoaded && productsRedux.shouldRetrieveFromCache && productsRedux.hasRetrievedFromCache) {
    setItemList(productsRedux.productListCurrent)
    setIsCacheLoaded(true)
  }

  //if we don't care about cache or we care and we've loaded from cache on the app and we've loaded cache on this page
  //then we know we should be keeping itemList and redux in sync
  //we do this so that we give time for cache to load both on the app and on this list page
  if (!productsRedux.shouldRetrieveFromCache || productsRedux.shouldRetrieveFromCache && productsRedux.hasRetrievedFromCache && isCacheLoaded) {
    //Once cache is loaded we can deal with any products that have been passed in
    debugger
    if (productToAdd) {
      productCopy = Object.assign({}, productToAdd)
      productCopy.storageId = Number(productsRedux.getAvailableProductId())
      setItemList([...itemList, productCopy]);
      route.params.productToAdd = null;
    }    
  }


  function onPress(press) {
    let product = press;
    let action = "DisplayExistingProduct";
    navigation.navigate("ProductSingleScreen", { action, product });

  }

  function deleteItem(productStorageId) {
    let newCurrentList = itemList.filter(item => item.storageId !== productStorageId)
    setItemList(newCurrentList);
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item ', [{ text: "Ok" }]);
    }
    else {
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
      response.storageId = productsRedux.getAvailableProductId();
      setItemList([response, ...itemList]);
    }
  }

  const ListItem = ({ item, deleteItem }) => {
    function ProductImage(item) {

      if (item.item.image) {
        return <Image source={{ uri: item.item.image }} style={styles.logo} />
      } else {
        return <Fragment></Fragment>
      }

    }
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => onPress(item)}>

        <View style={styles.listItemView}>
          <ProductImage item={item}></ProductImage>
          <Text style={styles.listItemText}>{item.item}</Text>
          <Icon name="remove" style={styles.removeIcon}
            onPress={() => deleteItem(item.storageId)} />
        </View>
      </TouchableOpacity>
    );
  };


  function RenderProducts() {
    itemList.map((product, id) => (<ListItem key={id} item={product} deleteItem={deleteItem}> </ListItem>))
  }

  return (

    <View style={styles.container}>
      <AddItem addItem={addItem} />
      <FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem id={item.storageId} item={item} deleteItem={deleteItem}> </ListItem>)}
        keyExtractor={(item, index) => {debugger; item.storageId.toString()}}

      />
      <Button title="Scan Another Item" color="black" onPress={() => {
        navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
        let shouldCompare = false;
        let compareProducts = [];
        navigation.navigate("Camera", {shouldCompare, compareProducts});
         }} />
         <Button title="Checkout" color = "blue" onPress={() => {
            let ghG = 0
            for (var x of itemList){
              ghG+=x.gHGEmissions
            }
            console.log(ghG)
            dispatchProducts({ type: 'product/productListHistory/add', payload: ghG })
            navigation.navigate("DataScreen")
          }} />
         <Button title="Idk how to move buttons further up" color = "red" onPress={() => {}} />
         <Button title="padding button" color = "red" onPress={() => {}} />

      {/* 
      <ThemeContext.Provider value="light">
        <Button
          title="Go back to first screen in stack (Home)"
          onPress={() => navigation.popToTop()}
        />
      </ThemeContext.Provider>
      */}
    </View>
  );
}



const styles = StyleSheet.create({
  removeIcon: {
    height: 20,
    width: 20,
    color: '#fab742',
  },
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',

  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: "center",
    alignItems: "center",
  },

  textTitle: {
    flex: 1,
    color: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    padding: 0,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    flex: 1,

  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    flex: 1
  },
  listItemText: {
    fontSize: 18,
    flex: 1
  },
  logo: {
    height: 90,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  logoTop: {
    height: 200,
    width: 400,
    resizeMode: 'cover',
    borderRadius: 0,
  },
});

export default ListScreen;
