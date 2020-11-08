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
    title: 'Shopping List',
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15, 
    backgroundColor: '#fff3c5',
    borderRadius: 3,
  },
  text: {
    color: '#000000',
    fontSize: 23, 
    textAlign: 'center',

  },
});

export default Header;