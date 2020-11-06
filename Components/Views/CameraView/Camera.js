import React, { Fragment, useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function Camera({ scanned, setScanned, navigation }) {
  const handleBarCodeScanned = ({ type, data }) => {
    //workaround for camera scanning in background
    //common issue: https://github.com/expo/expo/issues/345
    if(scanned!=undefined){
      navigation.pop()
      setScanned(true);
      console.log("navigating")
      navigation.navigate("ProductSingleScreen", { type, data });
    } else{
      //camera scans a few times before navigating
      //console.log("spam")
    }
  }
 
  return (
    <Fragment>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
            ExpoCamera.resumePreview();
          }}
        />
      )}
    </Fragment>
  );
}

export default Camera;
