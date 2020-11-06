import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import ThemedButton from "../../Common/ThemedButton";
import serverInfo from './../../Common/ServerInfo.js';

const ThemeContext = React.createContext("light");

function ServerScreen({ navigation }) {
  const [data, setData] = useState("hi");
  async function getInfo () {
    console.log("button press")
    try {

      let res = await fetch(serverInfo.path + "/scannedCode", {

        method: "POST",
        //mode: 'no-cors', // no-cors, *cors, same-origin, cors

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeType: "2",
          code: "016000275287",
        }),
      });
      
      let response = await res.json();
      console.log(response);
      setData(JSON.stringify(response));

    } catch (e) {
      console.error(e);
    }
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Server Screen</Text>
      <Text>data {data}</Text>
      <ThemeContext.Provider value="light">
        <ThemedButton
          title="Call server"
          onPress={() => 
            {
              getInfo();
            }

          }
        />
      </ThemeContext.Provider>
    </View>
  );
}

export default ServerScreen;
