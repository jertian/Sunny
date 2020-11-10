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
  let [itemList, setItemList] = useState([...productsRedux.productListCurrent]);
  const dispatchProducts = useDispatch()



  function onPress(press) {
    if (press.text == item) {
      console.log("going to prod")
      //navigation.navigate("ProductSingleScreen", { product })
    }
  }



  function deleteItem (productStorageId) {
    //dispatchProducts({type: "product/productCurrentList/delete", payload: productStorageId});

    let newCurrentList = itemList.filter(item => item.storageId !== productStorageId)
    //itemArray = newCurrentList;
    //debugger;
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
