import React, { useState, useEffect, Fragment } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import AddItem from "./AddItem"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import serverInfo from './../../Common/ServerInfo.js';
import commonFunctions from './../../Common/commonFunctions.js';

const ThemeContext = React.createContext("light");


function BlackListScreen({ route, navigation }) {

  const dispatchPreferences = useDispatch()
  const selectPreferences = state => state.preferences;
  const preferencesRedux = useSelector(selectPreferences);

  const selectAccount = state => state.account;
  const accountRedux = useSelector(selectAccount);
  let [isItemListSynced, setIsItemListSynced] = useState(false);
  let [lastAction, setLastAction] = useState("");

  let [itemList, setItemList] = useState([]);
  let [syncWarning, setSyncWarning] = useState("");

    function updateItemListFromServer(response){
      debugger;
      if(response.type == "failure"){
        console.error("Sync warning in blacklist");
        setSyncWarning("Unable to sync last operation into database, please check your connection or restart the app to be in full sync")
      }
      if(response.blackList){
      setItemList(response.blackList);
      }
    }
  useEffect(() => {
    if(isItemListSynced){
    if(!commonFunctions.arraysEqual(itemList, preferencesRedux.blackList)){
      dispatchPreferences({ type: 'preferences/blacklist/update', payload: itemList })
      if(lastAction === "add"){
        serverInfo.callServer("POST", "addToUserBlackList", {userID:  accountRedux.userID, passwordHash: accountRedux.passwordHash, company:itemList[0]}, updateItemListFromServer)
        setLastAction("")
      }
      else if (lastAction === "remove"){
        serverInfo.callServer("POST", "updateUserBlackList", {userID:  accountRedux.userID,passwordHash: accountRedux.passwordHash, blackList :itemList}, updateItemListFromServer)
        setLastAction("")
 
      }



      }
    }
    else{
      setIsItemListSynced(true)
      setItemList(preferencesRedux.blackList)
    }
  });
  
  
  function deleteItem(preferencestorageID) {
    let newCurrentList = itemList.filter(item => item.storageID !== preferencestorageID)
    setItemList(newCurrentList);
    setLastAction("remove")
  }

  const addItem = (companyName) => {
    if (!companyName) {
      Alert.alert('Error', 'Please enter an item ', [{ text: "Ok" }]);
    }
    else {
      //text = "apple"
      //text.storageID = productsRedux.getAvailableProductId();
      //setItemList([text, ...itemList]);
      /*
      let obj = {
        "storageID": 0,
        "text": "apple",
      }
      obj.storageID = productsRedux.getAvailableProductId();
      setItemList([text, ...itemList]);
      */
      let obj = {
        storageID: 0,
        companyName: companyName,
      }
      obj.storageID = commonFunctions.getMaxIdOfList(itemList) + 1
      setItemList([obj, ...itemList]);
      setLastAction("add")
      
    }
  }

  const ListItem = ({ item, deleteItem }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
       >

        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{item.companyName}</Text>
          <Icon name="remove" style={styles.removeIcon}
            onPress={() => deleteItem(item.storageID)} />
        </View>
      </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>
      <AddItem addItem={addItem}/>
      {syncWarning != "" && (<Text style={{color: 'red', fontSize: 30}}>{syncWarning}</Text>)}
      <FlatList
        data={itemList}
        renderItem={({ item }) => (<ListItem  item={item} deleteItem={deleteItem}> </ListItem>)}
        keyExtractor={(item, index) => item.storageID.toString()}

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
