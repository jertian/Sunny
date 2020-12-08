import { NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { StatusBar } from "expo-status-bar";
import React, { useState,Component, useEffect } from "react";
import { View, Button,Animated,ScrollView ,SafeAreaView, TouchableOpacity,Image, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import serverInfo from './../../Common/ServerInfo.js';

const deviceWidth = Dimensions.get('window').width -20
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]


const ThemeContext = React.createContext("light");

const DataScreen = ({route, navigation}) => {
  const dispatchProducts = useDispatch()
  const selectProduct = state => state.products;
  const selectAccount = state => state.account;
  const accountRedux = useSelector(selectAccount);
  const productsRedux = useSelector(selectProduct);
  let [itemList, setItemList] = useState([]);
  const {hasLoadedRecommendedProducts} = route.params
  let numItems = images.length
  let itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
  let animVal = new Animated.Value(0)
  let imageArray = []
    let barArray = []
    itemList.forEach((item, i) => {
      debugger;
      console.log(item, i)
      const thisImage = (
        <View key={`image${i}` } style={{ width: deviceWidth }}
        >
        <Text style = {{  textAlign: 'center'}}>{item.product.item}</Text>
        <Image
          source={{ uri: item.product.image}}
          style={styles.productImage}
        />
        </View>
      )
      imageArray.push(thisImage)

      const scrollBarVal = animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })
  function handleSetRecommendedProducts(response){
    setItemList(response.bestScans)
  }
  if(!route.params.hasLoadedRecommendedProducts){
    serverInfo.callServer("POST", "getUsersBestScans", {userID:  accountRedux.userID, passwordHash: accountRedux.passwordHash}, handleSetRecommendedProducts)
    route.params.hasLoadedRecommendedProducts = true;
  }

  async function pushDB(data){
    try {
      console.log("calling server at : " + serverInfo.path + "/updateUserHistory")
      console.log("user: " + accountRedux.userID)
      //let res = await fetch(serverInfo.path + "/JamesTest", {
      let res = await fetch(serverInfo.path + "/updateUserHistory", {

        method: "POST",
        //mode: 'no-cors', // no-cors, *cors, same-origin, cors

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: accountRedux.userID,
          history: data,
        }),
      });
      let response = await res.json();
      console.log(response)
    } catch (e) {
      console.error(e);
    }
  }

  let l = []
  let d = []
 // console.log(productsRedux.productListHistory.length)
  pushDB(productsRedux.productListHistory)

  if (productsRedux.productListHistory.length>0){
    for (var i = 0; i<productsRedux.productListHistory.length; i++){
      l.push("Trip " + (i+1))
      d.push(productsRedux.productListHistory[i])
    }
  }
 // console.log(l)
 // console.log(d)
  const data = {
    labels: l,
    datasets: [{
      data: d,
    }],
    legend: ["Average GH Emissions"] // optional
  }

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(	250, 185, 25, ${opacity})`,
    style: {
      borderRadius: 16
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Account Purchase History
      </Text>
      {d.length> 0 &&
      <LineChart
        data={data}
        width={Dimensions.get('window').width-50} // from react-native
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16
        }}
      />
      }
      {d.length == 0 &&
        <Text>
        Your history will be displayed here when you've checkout. If you're seeing this it means you have no history yet!
      </Text>
      }

      <Button title="Clear History" color = "red" onPress={() => {
        dispatchProducts({ type: 'product/productListHistory/clear'})
        console.log(productsRedux.productListHistory)
      }} />
      <Button title="Clear Recent" color = "red" onPress={() => {
        dispatchProducts({ type: 'product/productListHistory/pop'})
        console.log(productsRedux.productListHistory)
      }} />
      <View style={styles.lineBreak}> 

      <Text style={styles.textTitle}>
        Best Products Scanned
      </Text>
      </View>
       <View
        style={styles.productCaroselContainer}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: animVal } } }],
              {useNativeDriver: false}
            )
          }
        >

          {imageArray}

        </ScrollView>
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineBreak:{
    marginTop : 40
  },
  scrollView: {
    marginHorizontal: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#ffffff',
  },
  productContainer: {
    height: 350,
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  productImage: {
    height: 300,
    resizeMode: 'contain',


  },
  productCaroselContainer: {
    margin: 10,
    height : 300,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#5294d6',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#fab919',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  bigGraph: {
    height: 200,
    width: 300,
    resizeMode: 'cover',
    borderRadius:0,
  },
  textTitle: {
    fontSize: 17,
    marginTop: 15,
    color: '#fab919',
    fontFamily: 'Nunito_400Regular'
   
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fab919',
    fontFamily: 'Nunito_400Regular'
   
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
});

export default DataScreen;
