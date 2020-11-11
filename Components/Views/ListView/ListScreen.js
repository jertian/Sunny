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

  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  let [itemList, setItemList] = useState([]);
  let [isItemListRetrieved, setIsItemListRetrieved] = useState(false);


  if (!isItemListRetrieved) {
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
  }
  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@currentShoppingList', JSON.stringify(data))
      console.log("Stored data sucessful")

    } catch (e) {
      console.error(e)

      // saving error
    }
  }
  

  function onPress(press) {
    debugger;
    /*
    if (press.text == item) {
      console.log("going to prod")
      //navigation.navigate("ProductSingleScreen", { product })
    }
    */
    let product = press;
    navigation.navigate("ProductSingleScreen", { product });

  }



  function deleteItem(productStorageId) {
    let newCurrentList = itemList.filter(item => item.storageId !== productStorageId)
    setItemList(newCurrentList);
    storeData(newCurrentList)
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item ', [{ text: "Ok" }]);
    }
    else {
      setItems(prevItems => {
        return [{ id: uuidv4(), text }, ...prevItems];
      });
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
     <View style={styles.imageContainer}>
        
     </View>
     <Image source={require('../../../assets/your_groceries.png')} style={styles.logoTop} />
     {/*
     <Image source={require('../../../assets/produce_icon.png')} style={styles.logoTop} />
       <Header></Header>
      <Text style={styles.textTitle}>Product Screen</Text>*/}
      
      <AddItem addItem={addItem}/>
      <FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem id={item.storageId} item={item} deleteItem={deleteItem}> </ListItem>)}
        keyExtractor={(item, index) => item.storageId.toString()}

      />
      <Button title="Scan Another Item" onPress={() => { navigation.goBack(); navigation.navigate("Camera") }} />

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
    resizeMode: 'cover',
    borderRadius: 10,
  },
  logoTop: {
    height: 200,
    width: 400,
    resizeMode: 'cover',
    borderRadius:0,
  },
});

export default ListScreen;
