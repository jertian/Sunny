import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { View, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function CustomHeader({ navigation }) {

    const selectAccount = state => state.account;
    const account = useSelector(selectAccount);

    return (
        <View style={styles.container}>

            <TouchableOpacity>
                <Image
                    source={require('./../../assets/back-button.png')}
                    style={styles.backButton}

                />
            </TouchableOpacity>

    
            <View style={styles.text}>
            <Text >Welcome {account.fName}</Text>
            </View>

            { account.photoURL !== "" && 
            <View style={styles.profilePicture}>
                <Image source={{ uri: account.photoURL }} style={styles.profilePicture}/>  
                </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row',
     
        backgroundColor: 'red'
    },
    backButton: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        tintColor: '#fab742',
        marginRight:'auto'
        

    },
    text: {
        fontSize: 18,
        backgroundColor: 'blue',
        flex: 1, textAlign:'center'
    },
    profilePicture: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        marginLeft: 'auto'    },
});
