import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity,FlatList,Alert } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header"
import AddItem from "./AddItem"
import ListItem from "./ListItem"

const ThemeContext = React.createContext("light");

function ListScreen({ route, navigation }) {
  let {item} = ""
  if(route.params!=undefined){
    item = route.params.item;
    let { upc } = route.params;
    let { image } = route.params;
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


  return (
    <View style={styles.container}>
      <Header></Header>
      <AddItem addItem={addItem}/>
      <FlatList 
        data = {items} 
        renderItem= {({item}) => (<ListItem item ={item} deleteItem={deleteItem} />
      )}/>

      <ThemeContext.Provider value="light">
        <Button title="Go back a page" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack (Home)"
          onPress={() => navigation.popToTop()}
        />
      </ThemeContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
});

export default ListScreen;
