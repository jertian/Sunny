import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style = {styles.text}></Text>
      <Icon name="angle-left" size={20} color="white"/>
    </View>
  );
};

Header.defaultProps = {
    title: '',
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15, 
    backgroundColor: '#fab919',
    borderRadius: 3,
    //justifyContent: 'flex-start',
    //alignItems: 'left',
  },
  text: {
    color: '#000000',
    fontSize: 23, 
    textAlign: 'left',

  },
});

export default Header;