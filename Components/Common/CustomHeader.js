import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { View, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';


/*
{
    "gHGEmissions": 3.4,
    "image": "https://images.barcodelookup.com/3493/34939175-1.jpg",
    "ingredients": [],
    "isFairTrade": false,
    "isSustainableBrand": true,
    "isVegan": false,
    "isVegetarian": false,
    "item": "Campbell S Campbell's Chunky Blazin' Roadhouse Chili-Style Soup",
    "manufacturer": "Campbell's",
    "manufacturerHeadquarters": "Camden, New Jersey, United States",
    "parentCompany": "",
    "subsidiaries": [
        "Pepperidge Farm",
        "Snyder's-Lance",
        "Bolthouse Farms",
        "Arnott's Biscuits",
        "Campbell Co of Canada",
        "CSC Brands LP",
        "Campbell Soup Asia ltd",
        "Late July Snacks LLC",
        "Joseph Campbell Company",
        "Campbell Japan Inc",
        "Arnotts New Zealand ltd",
        "Campbell Sales Company",
        "Campbells de Mexico S.A. de C. V."
    ],
    "upc": "063211207958"

    campbell
    {"gHGEmissions": 3.4, "image": "https://images.barcodelookup.com/3493/34939175-1.jpg", "ingredients": [], "isFairTrade": false, "isSustainableBrand": true, "isVegan": false, "isVegetarian": false, "item": "Campbell S Campbell's Chunky Blazin' Roadhouse Chili-Style Soup", "manufacturer": "Campbell's", "manufacturerHeadquarters": "Camden, New Jersey, United States", "parentCompany": "", "subsidiaries": ["Pepperidge Farm", "Snyder's-Lance", "Bolthouse Farms", "Arnott's Biscuits", "Campbell Co of Canada", "CSC Brands LP", "Campbell Soup Asia ltd", "Late July Snacks LLC", "Joseph Campbell Company", "Campbell Japan Inc", "Arnotts New Zealand ltd", "Campbell Sales Company", "Campbells de Mexico S.A. de C. V."], "upc": "063211207958"}

    heinz
    {"gHGEmissions": 1.48475, "image": "https://images.barcodelookup.com/3494/34940587-1.jpg", "ingredients": ["tomato paste(made from ripe tomatoes", " good fresh) liquid sugar", " white vinegar ", " salt ", " onion powder ", " spices"], "isFairTrade": false, "isSustainableBrand": true, "isVegan": true, "isVegetarian": true, "item": "Heinz Tomato Ketchup Twin Pack", "manufacturer": "H.J. Heinz Company of Canada LP", "manufacturerHeadquarters": "", "parentCompany": "Kraft Heinz Company", "subsidiaries": [], "upc": "057000613280"}

    pringles 
    {"gHGEmissions": 3.1595, "image": "https://images.barcodelookup.com/2758/27582012-1.jpg", "ingredients": ["dried potato", " vegetable oil", " corn flour", " corn starch", " rice flour", " maltodextrin", " mono - and diglycerides", " salt", " citric acid", " wheat starch"], "isFairTrade": false, "isSustainableBrand": true, "isVegan": false, "isVegetarian": true, "item": "PringlesMD \u2013 Croustilles, Saveur Originale, 160 G", "manufacturer": "Pringles", "manufacturerHeadquarters": "", "parentCompany": "Kellogg's", "subsidiaries": [], "upc": "064100111332"}
}*/

export default function CustomHeader(props) {
    const selectAccount = state => state.account;
    const account = useSelector(selectAccount);
    const navigation = useNavigation();
    function backButtonOnClick(){
        navigation.goBack()
      
    }
    function TitleComponent(props) {
        if (props) {
            if (props.title != null && props.title !== "") {
                console.log(props.title + "equals to props.title" )
                return <Text style={styles.text}>  {props.title} </Text>
            }
        }
        console.log("prev statement failed")
        return (<Text style={styles.text}>Welcome {account.fName}</Text>)

    }
    function BackButtonComponent(){
        if(navigation.canGoBack()){
        return (
        <TouchableOpacity onPress = {backButtonOnClick}>
            <Image style={styles.backButton} source={require('./../../assets/back-button.png')} />
        </TouchableOpacity>
        )
        }
        return        (<Text style = {styles.backButtonPlaceholder}> </Text>)
    }
    function ProfilePicture() {
        if (account.photoURL !== "") {
            return (
                <View style={styles.profilePicture}>
                    <Image source={{ uri: account.photoURL }} style={styles.profilePicture} />
                </View>
            )
        }
        else {
            return (<View style={styles.profilePicture}>
            <Image source={require('./../../assets/blank_profile.png')}  style={styles.profilePicture} />
        </View>)
        }
    }

    return (

        <View style={styles.container}>
            <BackButtonComponent></BackButtonComponent>
            <TitleComponent title={props.title} />
            <ProfilePicture></ProfilePicture>
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

        width: 350,
        display: 'flex',
        flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row',

        //backgroundColor: 'red'
    },
    backButton: {
        height: 50,
        width: 50,
        borderRadius: 40 / 2,
        tintColor: '#fab742',
        marginRight: 'auto'


    },
    backButtonPlaceholder : {

        height: 50,
        width: 50,
        marginRight: 'auto',
        borderRadius: 40 / 2,
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
        //marginRight: "auto",
        marginLeft: 'auto'
    },
});
