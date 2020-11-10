import React, { useState, useEffect } from "react";
import {Button, View, Text,StyleSheet,Image, TouchableOpacity } from "react-native";
import { useFonts, Nunito_400Regular} from '@expo-google-fonts/nunito';
import { AppLoading} from 'expo';
import * as Font from 'expo-font'
import serverInfo from './../../Common/ServerInfo.js';

export default function CompareScreen({ route, navigation }) {
  let { products } = route.params;
  let n = products.length
  let productInfo = []

  for (var i =0; i<n; i++){
    let t = JSON.parse(products[i])
    productInfo.push(t)
  }
  const [fontsLoaded, setFontLoaded] = useState(false);
  Font.loadAsync({  
    'Nunito': require('../../../assets/fonts/Nunito-Regular.ttf')
  }).then(() => setFontLoaded(true));

 if (!fontsLoaded) {
    return <AppLoading / >
  }
    return (
      <View style={styles.container}>
      {/*
      <Text style={styles.textTitle}>Compare Screen</Text> */}
        <Image
          source={{uri: productInfo[0].image}}
          style={styles.productImage}
        />
        <Text style={styles.text}>
       {productInfo[0].item} 
      </Text>
        <View style={{ flexDirection: 'row', margin: 10, }}>
        {/*
                    <TouchableOpacity onPress={() => { }}>
                        <Icon style={{ padding: 3 }} name="leaf" size={15} color="black" />
                    </TouchableOpacity>
*/}
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegan.png')} style={styles.susIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegetarian.png')} style={styles.susIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/fair_trade.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
            </View>
        
        <Image
          source={{uri: productInfo[0].image}}
          style={styles.productImage}
        />
        {/*<Text>
        Number of products: {n} 
      </Text> */}
    
      <Text style={styles.text}>
       {productInfo[1].item} 
      </Text>

      <View style={{ flexDirection: 'row', margin: 10, }}>
        {/*
                    <TouchableOpacity onPress={() => { }}>
                        <Icon style={{ padding: 3 }} name="leaf" size={15} color="black" />
                    </TouchableOpacity>
*/}
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegan.png')} style={styles.susIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegetarian.png')} style={styles.susIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/fair_trade.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
            </View>



      </View>
      
      
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    padding: 20,
    
  },
  productImage: {
    height: 200,
    width: 250,
    resizeMode: 'cover',
    borderRadius:10,
    marginVertical:7
  },
  textTitle: {
    fontSize: 38,
    color: '#FFFFFF',
    marginTop: -10,
    fontFamily: 'Nunito'
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
  susIcon: {
    height: 30,
    width: 30,
    color: '#2e64e5',
    margin: 7
  },
});
