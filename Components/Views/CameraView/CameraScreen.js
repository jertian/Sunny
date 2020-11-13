import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Button, Text, Fragment } from "react-native";
import Camera from "./Camera";

export default function CameraScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [scanned, setScanned] = useState(false);
  
  let { shouldCompare } = route.params;
  let { compareProducts } = route.params;

  if(shouldCompare === null){
      shouldCompare = false;
  }
  if (compareProducts === null){
    compareProducts = [];
  }

  useEffect(() => {
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        setLoading(true);
      }
    })();
  }, []);

  function ErrorMessage() {
    return (
      <Text>
        Oops something went wrong, app needs a camera to function. Please swap
        to a device with a camera or enable your camera permissions from your
        settings to continue
      </Text>
    );
  }

  function DetermineDisplay() {
    if (hasPermission === true) {
      return;
    } else if (hasPermission === null) {
      return <Text>No camera found on device </Text>;
    } else if (hasPermission === false) {
      return (
        <Text>"No access to camera, please enable it from permissions" </Text>
      );
    } else {
      return ErrorMessage();
    }
  }
  function cameraOnScanHandler(type, data){

    //workaround for camera scanning in background
    //common issue: https://github.com/expo/expo/issues/345
    if(scanned!=undefined){
      navigation.pop()
      setScanned(true);
      console.log("navigating")
      let action;
      if (shouldCompare){
        action = "DisplayCompareProduct"
      }
      else{ 
        action = "DisplayScannedProduct";

      }
      navigation.navigate("ProductSingleScreen", { type, data, action, compareProducts });
    } else{
      //camera scans a few times before navigating
      //console.log("spam")
    }
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Camera
        scanned={scanned}
        setScanned={() => {
          setScanned();
        }}
        onScan = {cameraOnScanHandler}
        
      />
      {DetermineDisplay()}
    </View>
  );
}
