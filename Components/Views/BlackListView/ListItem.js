import React from 'react';
import { StyleSheet, Text,  View, TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
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

export default ListItem;