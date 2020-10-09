import React, { Fragment, useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function Camera({ scanned, setScanned, navigation }) {
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("ProductSingleScreen", { type, data });
    fetch("http://108.162.100.190:5000/sub",{
          method: 'POST',
          body: JSON.stringify({'codeType': type,'code': data}),
           headers: {
          "Content-Type": "application/json"
          }}).then(response => response.json().then(data => {
        //this.setState({....});
        console.log(data)
      }))

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
