import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ThemedButton from "../../Common/ThemedButton";
const ThemeContext = React.createContext("light");
import { useSelector, useDispatch } from 'react-redux'

export default function HomeExampleScreen({ navigation }) {
  const selectAccount = state => state.account
  const account = useSelector(selectAccount);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemeContext.Provider value="dark">
        {
          
          <Text h4 style={{ left: "-50" }}> Welcome {account.name}</Text>
        
        
        }
        
        <ThemedButton
          title={"Go to Simple Screen Navigation Example"}
          onPress={() => navigation.navigate("ScreenExample")}
        />
        <ThemedButton
          title={"Landing Screen"}
          onPress={() => navigation.navigate("LandingScreen")}
        />
         <ThemedButton
          title={"Preferences Screen"}
          onPress={() => navigation.navigate("PreferencesScreen")}
        />
        <ThemedButton
          title={"Data Screen"}
          onPress={() => navigation.navigate("DataScreen")}
        />
         <ThemedButton
          title={"Login Screen"}
          onPress={() => navigation.navigate("LoginScreen")}
        />
        <ThemedButton
          title={"See List"}
          onPress={() => navigation.navigate("ListScreen")}
        />
        <ThemedButton
          title={"Go to Database Tester"}
          onPress={() => navigation.navigate("DatabaseTesterScreen")}
        />
        <ThemedButton
          title={"Go to Camera"}
          onPress={() => navigation.navigate("Camera")}
        />
        <ThemedButton
          title={"Go an example Product Screen"}
          onPress={() => {
            const { type } = "";
            const { data } = "";
            navigation.navigate("ProductSingleScreen", { type, data });
          }}
        />
        <ThemedButton
          title={"Go to Server Tester"}
          onPress={() => {
            navigation.navigate("ServerScreen");
          }}
        />
      </ThemeContext.Provider>
    </View>
  );
}
