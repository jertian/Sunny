import React, { useState, useEffect, Fragment } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header"
import AddItem from "./AddItem"
import Icon from 'react-native-vector-icons/FontAwesome';
//import ListItem from "./ListItem"
import { useSelector, useDispatch  } from 'react-redux'

const ThemeContext = React.createContext("light");

function ListScreen({ route, navigation }) {
  const selectProduct = state => state.products;
  let productsRedux = useSelector(selectProduct);
  const dispatchProducts = useDispatch()
  let [itemList, setItemList] = useState([]);
  let [isItemListPopulated, setIsItemListPopulated] = useState(false);


  let [fakeInfo, setFakeInfo] = useState(false)




        //Testing =======================================================
      //-------------------------------------------------------------------
  function tryToFakeInfo(){
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
        productsRedux = useSelector(selectProduct);
        let storageId = productsRedux.productListHistory.length;
        dispatchProducts({type: "product/productListCurrent", payload: {...response, storageId : storageId}});
        dispatchProducts({type: "product/productListHistory", payload: {...response, storageId : storageId}});
  
        productsRedux = useSelector(selectProduct);
         storageId = productsRedux.productListHistory.length;
        dispatchProducts({type: "product/productListCurrent", payload: {...response1, storageId : storageId}});
        dispatchProducts({type: "product/productListHistory", payload: {...response1, storageId : storageId}});
  
        productsRedux = useSelector(selectProduct);
        storageId = productsRedux.productListHistory.length;
        dispatchProducts({type: "product/productListCurrent", payload: {...response2, storageId : storageId}});
        dispatchProducts({type: "product/productListHistory", payload: {...response2, storageId : storageId}});
  
        //setItemList(productsRedux.productListCurrent);
        setItemList([...itemList, response, response1]);

        setFakeInfo(true)
        //-------------------------------------------------------------------
        //Testing End =======================================================

  }
  if(!fakeInfo){
    tryToFakeInfo()
  }  
   productsRedux.productListCurrent;

    if(!isItemListPopulated){
      productsRedux = useSelector(selectProduct);
      setIsItemListPopulated(true);
    }
  function onPress(press) {
    if (press.text == item) {
      console.log("going to prod")
      //navigation.navigate("ProductSingleScreen", { product })
    }
  }



  function deleteItem (productStorageId) {
    //dispatchProducts({type: "product/productCurrentList/delete", payload: productStorageId});

    //productsRedux = useSelector(selectProduct);
    let newCurrentList = productsRedux.productListCurrent.filter(item => item.storageId !== productStorageId)
    //itemArray = newCurrentList;
    debugger;
    setItemList(newCurrentList);
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
    function ProductImage(item){
      if (item.item.image){
        return <Image source={{ uri: item.item.image }} style={styles.logo} />
      }else{
        return <Fragment></Fragment>
      }

    }
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => onPress(item)}>

        <View style={styles.listItemView}>
          <ProductImage item = {item}></ProductImage>
          <Text style={styles.listItemText}>{item.item}</Text>
          <Icon name="remove" size={20} color="black"
            onPress={() => deleteItem(item.storageId)} />
        </View>
      </TouchableOpacity>
    );
  };
  

  function RenderProducts () {
    itemList.map((product, id) => (<ListItem item={product} deleteItem={deleteItem}> </ListItem>))
  }


  return (
    <View style={styles.container}>
      <Header></Header>
      {/* <Text style={styles.textTitle}>Product Screen</Text>*/}
      {/*<AddItem addItem={addItem} />*/}
      {/*<RenderProducts></RenderProducts>*/}
      {/*<FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem item={item} deleteItem={deleteItem} />
        )} />
*/}
    {itemList.map((product, id) => (<ListItem key = {id} item={product} deleteItem={deleteItem}> </ListItem>))}
      {/* 
      <ThemeContext.Provider value="light">
        <Button title="Go back a page" onPress={() => navigation.goBack()} />
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
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },

  textTitle: {
    flex: 1,
    color: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    margin: 7,
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  listItemText: {
    fontSize: 18,
  },
  logo: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
    margin: 7,
    borderRadius: 10,
  },
});

export default ListScreen;
