import React, { useState, useEffect }  from 'react';
import {Text, TouchableOpacity, StyleSheet, TouchableHighlight, Button, Alert} from 'react-native';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';

const LoginButton = ({buttonTitle, ...rest}) => {

  /*
  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    //style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    //onHideUnderlay: () => setIsPress(false),
    //onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
  };
  */
 /*
foo = {x:5,y:2}
let {x, y} = foo;

//Is the equivalent to:

let x = foo.x;
let y = foo.y;

//x = 5
//y = 2
*/
  const [color, setColor] = useState("#841584");
  let foo = {initalColor:"#841584", second :"#000080"}
  let {initalColor,second} = foo

  return (
    <Button
      title= {buttonTitle}
      color= {color}
      onPress={(event) => {
        if (color == "#000080"){
          setColor("#841584")
        }
        else{
          setColor("#000080")
        }
        
        //console.log(initalColor)
        console.log('HELLO')
        //setColor("#811111")
        event.target.color = second
        console.log(initalColor)
      
      }}
      accessibilityLabel="Learn more about this purple button"
    />

    
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: windowHeight / 12,
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A3A3A3',
  },
});