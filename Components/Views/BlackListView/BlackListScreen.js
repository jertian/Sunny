import React, { useState, useEffect, Fragment } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import AddItem from "./AddItem"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'

const ThemeContext = React.createContext("light");


function BlackListScreen({ route, navigation }) {

  const dispatchPreferences = useDispatch()
  const selectPreferences = state => state.preferences;
  const preferencesRedux = useSelector(selectPreferences);
  let [itemList, setItemList] = useState([]);

  useEffect(() => {
    if(itemList  != preferencesRedux.blackList){
      dispatchPreferences({ type: 'preferences/blacklist/update', payload: itemList })
    }
  });
  

  function deleteItem(preferenceStorageId) {
    let newCurrentList = itemList.filter(item => item.storageId !== preferenceStorageId)
    setItemList(newCurrentList);
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item ', [{ text: "Ok" }]);
    }
    else {
      //text = "apple"
      //text.storageId = productsRedux.getAvailableProductId();
      //setItemList([text, ...itemList]);
      /*
      let obj = {
        "storageId": 0,
        "text": "apple",
      }
      obj.storageId = productsRedux.getAvailableProductId();
      setItemList([text, ...itemList]);
      */
      let obj = {
        "storageId": 0,
        "text": text,
      }
      obj.storageId = preferencesRedux.getAvailablePreferenceId();
      setItemList([obj, ...itemList]);
      
    }
  }

  const ListItem = ({ item, deleteItem }) => {
    debugger
    return (
      <TouchableOpacity
        style={styles.listItem}
       >

        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{item.text}</Text>
          <Icon name="remove" style={styles.removeIcon}
            onPress={() => deleteItem(item.storageId)} />
        </View>
      </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>
      <AddItem addItem={addItem}/>
      <FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem  item={item} deleteItem={deleteItem}> </ListItem>)}
     //keyExtractor={(item, index) => item.storageId.toString()}

      />
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
