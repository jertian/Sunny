import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function ProductSingleScreen({ route, navigation }) {
  let { data } = route.params;
  let { type } = route.params;

  if (data === "" || data === undefined) {
    data = "[data_info should be here]";
    type = "[type_info should be here]";
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Product screen </Text>
      <Text>
        Bar code with type {type} and data {data} has been scanned!
      </Text>
    </View>
  );
}
