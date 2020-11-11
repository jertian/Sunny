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
                    {productInfo[0].isVegan &&  
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegan.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {productInfo[0].isVegetarian && 
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegetarian.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {productInfo[0].isFairTrade && 
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/fair_trade.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {productInfo[0].isSustainableBrand && 
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/fair_trade.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {true && 
                    <TouchableOpacity style={styles.greenEmission}>
                    <Text style={styles.textEmission}> {productInfo[0].gHGEmissions} </Text>
                    </TouchableOpacity>
                    }
            </View>
        
        <Image
          source={{uri: productInfo[1].image}}
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
                    {productInfo[1].isVegan &&  
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegan.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {productInfo[1].isVegetarian &&  
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/vegetarian.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {productInfo[1].isFairTrade &&   
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/fair_trade.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {productInfo[1].isSustainableBrand && 
                    <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../../../assets/sustainable.png')} style={styles.susIcon}/>
                    </TouchableOpacity>
                    }
                    {true && 
                    <TouchableOpacity style={styles.greenEmission}>
                    <Text style={styles.textEmission}> {productInfo[1].gHGEmissions} </Text>
                    </TouchableOpacity>
                    }
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
    width: 200,
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
    height: 40,
    width: 40,
    color: '#2e64e5',
    margin: 7
  },
  greenEmission: {
    height: 40,
    width: 40,
    fontSize: 12,
    color: '#2e64e5',
    borderWidth:5,
    borderColor  : "#f19820",
    borderRadius: 50,
    alignItems : "center" ,
    margin: 7
    
  },
  textEmission: {
    fontSize: 17,
    color: "black",
    
    textAlign: 'left',
    paddingTop:5,
  },
});
