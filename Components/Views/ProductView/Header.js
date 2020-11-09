import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';


const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style = {styles.text}>{title}</Text>
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
    backgroundColor: 'white',
    borderRadius: 3,
    
  },
  text: {
    color: '#000000',
    fontSize: 23, 

  },
});

export default Header;