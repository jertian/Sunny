import React, { useState, useEffect, Fragment } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header"
import Icon from 'react-native-vector-icons/FontAwesome';
//import ListItem from "./ListItem"
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonFunctions from './../../Common/commonFunctions.js';

const ThemeContext = React.createContext("light");


function ListScreen({ route, navigation }) {
  let { productToAdd } = route.params;
  const dispatchProducts = useDispatch()
  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  let [itemList, setItemList] = useState([]);
  let [isCacheLoaded, setIsCacheLoaded] = useState(false);
  debugger;
  useEffect(() => {
    if (itemList != productsRedux.productListCurrent) {
      storeData(itemList);
      dispatchProducts({ type: 'product/productListCurrent/replaceAll', payload: itemList })
    }
  });
  const storeData = async (data) => {
    try {
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
    debugger;

    if (productToAdd) {
      let productCopy = Object.assign({}, productToAdd)
      productCopy.storageID = commonFunctions.getMaxIdOfList(itemList) + 1
      setItemList([...itemList, productCopy]);
      route.params.productToAdd = null;
    }    
  }


  function onPress(press) {
    let product = press;
    let action = "DisplayExistingProduct";
    navigation.navigate("ProductSingleScreen", { action, product });

  }

  function deleteItem(productstorageID) {
    let newCurrentList = itemList.filter(item => item.storageID !== productstorageID)
    setItemList(newCurrentList);
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
            onPress={() => deleteItem(item.storageID)} />
        </View>
      </TouchableOpacity>
    );
  };


  function RenderProducts() {
    itemList.map((product, id) => (<ListItem key={id} item={product} deleteItem={deleteItem}> </ListItem>))
  }

  return (

    <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem id={item.storageID} item={item} deleteItem={deleteItem}> </ListItem>)}
        keyExtractor={(item, index) => {
          try { 
            item.storageID.toString()
          }
          catch(e){
            item.storageID = 0
          }
          
          }}

      />
      <Button title="Scan Another Item" color="black" onPress={() => {
        navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
        let shouldCompare = false;
        let compareProducts = [];
        navigation.navigate("Camera", {shouldCompare, compareProducts});
         }} />
         <Button title="Checkout" color = "blue" onPress={() => {
            let ghG = 0
            let c = 0
            for (var x of itemList){
              ghG+=x.gHGEmissions
              c+=1
            }
            let avg = (ghG/c)
            console.log(avg)
            dispatchProducts({ type: 'product/productListHistory/add', payload: avg })
            setItemList([]);
            console.log(productsRedux.productListHistory)
            navigation.navigate("DataScreen", {hasLoadedRecommendedProducts: false})
          }} />
         <Button title="" color = "red" onPress={() => {}} />
         <Button title="" color = "red" onPress={() => {}} />

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
