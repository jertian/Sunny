import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity,FlatList,Alert, Image } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header"
import AddItem from "./AddItem"
import Icon from 'react-native-vector-icons/FontAwesome';
//import ListItem from "./ListItem"

const ThemeContext = React.createContext("light");

function ListScreen({ route, navigation }) {
  let {item} = ""
  let {upc} = ""
  let {image} = ""
  if(route.params!=undefined){
    item = route.params.item;
    upc = route.params.upc;
    image = route.params.image;
  }

  function onPress(press){
    let type = ""
    if (press.text == item){
      console.log("going to prod")
      navigation.navigate("ProductSingleScreen", { type, upc })
    }
  }

  const [items, setItems] = useState([
      {id: uuidv4(), text: item},
      {id: uuidv4(), text: 'Milk'},
      {id: uuidv4(), text: 'Eggs'},
      {id: uuidv4(), text: 'Bread'},
      {id: uuidv4(), text: 'Juice'},
    ])


  const deleteItem = (id) => {
    setItems(prevItems =>{
      return prevItems.filter(item => item.id != id);
    });
  }

  const addItem = (text) => {
    if(!text){
      Alert.alert('Error', 'Please enter an item ', [{text:"Ok"}]);
    }
    else{
      setItems(prevItems => {
        return [{id: uuidv4(), text},...prevItems];
      });
    }   
  }

  const ListItem = ({item, deleteItem}) => {
  return (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={()=> onPress(item)}>
      
      <View style = {styles.listItemView}>
      <Image
          source={require('../../../assets/preferences.png')}
          style={styles.logo}/>
        <Text style = {styles.listItemText}>{item.text}</Text>
        <Icon name="remove" size={20} color="black"
        onPress={() => deleteItem(item.id)}/>
      </View> 
    </TouchableOpacity>
  );
};



  return (
    <View style={styles.container}>
       <Header></Header>
     {/* <Text style={styles.textTitle}>Product Screen</Text>*/}
      <AddItem addItem={addItem}/>
      <FlatList 
        data = {items} 
        renderItem= {({item}) => (<ListItem item ={item} deleteItem={deleteItem} />
      )}/>

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
   listItem:{
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
    backgroundColor:"#ffffff"
  }, 
  listItemText: {
    fontSize: 18, 
  },
  logo: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
    margin: 7,
    borderRadius:10,
  },
});

export default ListScreen;
