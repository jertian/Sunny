import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


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
    backgroundColor: '#fab919',
    borderRadius: 3,
  },
  text: {
    color: '#000000',
    fontSize: 23, 
    textAlign: 'center',

  },
});

export default Header;