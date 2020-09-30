import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";

const ThemeContext = React.createContext("light");

function ScreenExample({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ScreenExample</Text>
      <ThemeContext.Provider value="light">
        <Button
          title="Go to another ScreenExample"
          onPress={() => navigation.push("ScreenExample")}
        />
        <Button title="Go back a page" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack (Home)"
          onPress={() => navigation.popToTop()}
        />
      </ThemeContext.Provider>
    </View>
  );
}

export default ScreenExample;
