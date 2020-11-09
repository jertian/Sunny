import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { View, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDimensions } from '@react-native-community/hooks'




export default function CustomHeader(props) {
    const selectAccount = state => state.account;
    const account = useSelector(selectAccount);
    function TitleComponent(props) {
        debugger;
        if (props) {
            if (props.title != null && props.title !== "") {
                return <Text style={styles.text}>  {props.title} </Text>
            }
        }

        return (<Text style={styles.text}>Welcome  {account.fName}</Text>)

    }
    function ReturnProfilePicture() {
        if (account.photoURL !== "") {
            return (
                <View style={styles.profilePicture}>
                    <Image source={{ uri: account.photoURL }} style={styles.profilePicture} />
                </View>
            )
        }
    }

    const { width, height } = useDimensions().window
    console.log(props);
    return (

        <View style={styles.container}>
            <Image style={styles.backButton} source={require('./../../assets/back-button.png')} />
            <TitleComponent title={props.title} />
            <ReturnProfilePicture></ReturnProfilePicture>
        </View>
/* In case the header doesn't divide properly this is a working example found at https://snack.expo.io/@jamesvachao/custom-header-title-component
      <View style={{
        flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row'
        }}>
      <Text
        style={{ width: 50, height: 50, marginRight:'auto' }}
      >Left</Text>
      <Text style = {{flex: 1, textAlign: 'center' }}>Middle</Text>
      <Text style={{marginLeft: 'auto'}}>Right</Text>
      </View>
  */
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',

        //backgroundColor: 'red'
    },
    backButton: {
        height: 50,
        width: 50,
        borderRadius: 40 / 2,
        tintColor: '#fab742',
        marginRight: 'auto'


    },
    text: {
        fontSize: 18,
        //backgroundColor: 'blue',
        flex: 1,
        textAlign: 'center'
    },
    profilePicture: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        marginLeft: 'auto'
    },
});
