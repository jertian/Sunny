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


function BlackListScreen({ route, navigation }) {
  //let {productToAdd} = route.params;
  const dispatchProducts = useDispatch()
  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  let [itemList, setItemList] = useState([]);
  console.log(itemList)
  let [isCacheLoaded, setIsCacheLoaded] = useState(false);
  useEffect(() => {
    if(itemList  != productsRedux.productListCurrent){
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

  //if we don't care about cache or we care and we've loaded from cache on the app and we've loaded cache on this page
  //then we know we should be keeping itemList and redux in sync
  //we do this so that we give time for cache to load both on the app and on this list page
  /*
  if(!productsRedux.shouldRetrieveFromCache || productsRedux.shouldRetrieveFromCache && productsRedux.hasRetrievedFromCache && isCacheLoaded){
    //Once cache is loaded we can deal with any products that have been passed in
    debugger
    if (productToAdd){
      productCopy = Object.assign({}, productToAdd)
      productCopy.storageId = Number(productsRedux.getAvailableProductId())
      setItemList([...itemList, productCopy]);
      route.params.productToAdd = null;
    }
    if(itemList  != productsRedux.productListCurrent){
    
  }
  
}
*/
  
/*
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@currentShoppingList')
      if (value !== null) {
        setItemList(JSON.parse(value))
        // value previously stored
      }
    } catch (e) {
      console.error(e)
      // error reading value
    }
  }
  getData()
  setIsItemListRetrieved(true);
  
  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@currentShoppingList', JSON.stringify(data))
      console.log("Stored data sucessful")

    } catch (e) {
      console.error(e)

      // saving error
    }
  }
  */

  function onPress(press) {
    /*
    if (press.text == item) {
      console.log("going to prod")
      //navigation.navigate("ProductSingleScreen", { product })
    }
    */
    let product = press;
    let action = "DisplayExistingProduct";

  }



  function deleteItem(productStorageId) {
    let newCurrentList = itemList.filter(item => item.storageId !== productStorageId)
    setItemList(newCurrentList);
    //storeData(newCurrentList)
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item ', [{ text: "Ok" }]);
    }
    else {
      
    //response.storageId = productsRedux.getAvailableProductId();
      setItemList([text, ...itemList]);
      
    }
  }

  const ListItem = ({ item, deleteItem }) => {
    debugger
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => onPress(item)}>

        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{item}</Text>
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
       {/*
     <View style={styles.imageContainer}>
             <Image source={require('../../../assets/your_groceries.png')} style={styles.logoTop} />

     </View>
   */}
     {/*
     <Image source={require('../../../assets/produce_icon.png')} style={styles.logoTop} />
       <Header></Header>
      <Text style={styles.textTitle}>Product Screen</Text>*/}
      
      <AddItem addItem={addItem}/>
      <FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem  item={item} deleteItem={deleteItem}> </ListItem>)}
     //keyExtractor={(item, index) => item.storageId.toString()}

      />

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
    color: 'black',
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
   listItem:{
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
    borderRadius:0,
  },
});

export default BlackListScreen;
