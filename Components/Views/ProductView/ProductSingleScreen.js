import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import serverInfo from './../../Common/ServerInfo.js';

//workaround for Jeremy being dumb, not knowing how to fix multiple queries
let wait = false

export default function ProductSingleScreen({ route, navigation }) {
  let { data } = route.params;
  let { type } = route.params;

  if (data === "" || data === undefined) {
    data = "[data_info should be here]";
    type = "[type_info should be here]";
  }

  const [info, setInfo] = useState("");
  async function getInfo () {
    try {
      let res = await fetch(serverInfo.path + "/scannedCode", {

        method: "POST",
        //mode: 'no-cors', // no-cors, *cors, same-origin, cors

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeType: "",
          code: data,
        }),
      });
      
      let response = await res.json();
      console.log(response);
      setInfo(JSON.stringify(response));

    } catch (e) {
      console.error(e);
    }
  }

  if(!wait){
    getInfo()
    wait = true 
  } else {
    console.log("waiting")
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Product screen </Text>
      <Text>
        Bar code with type {type} and data {data} has been scanned!
        Info: {info}
      </Text>
    </View>
  );
}
