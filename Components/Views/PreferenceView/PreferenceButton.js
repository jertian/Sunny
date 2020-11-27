import React, { useState, useEffect }  from 'react';
import {Text, TouchableOpacity, StyleSheet, TouchableHighlight, Button, Alert} from 'react-native';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';

const PreferenceButton = ({buttonTitle, initialToggle, onClickCallback, ...rest}) => {

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
  const [isToggled, setToggled] = useState(initialToggle);

  const [color, setColor] = useState(initialToggle ? "#98FB98" : "#FFFFFF");
  let foo = {inActiveColor:"#FFFFFF", activeColor :"#98FB98"}
  let {inActiveColor, activeColor} = foo
/*
  <Button
      title= {buttonTitle}
      backgroundColor = 'red'
      color= {color}
      onPress={(event) => {
        if (color == "#000080"){
          setColor("#841584")
        }
        else{
          setColor("#000080")
        }
        
        //console.log(inActiveColor)
        console.log('HELLO')
        //setColor("#811111")
        event.target.color = activeColor
        console.log(inActiveColor)
      
      }}
      accessibilityLabel="Learn more about this purple button"
    />
*/
  return (
    <TouchableOpacity style={{backgroundColor: color, marginTop: 20, width: '100%',height: windowHeight / 12,padding: 10,alignItems: 'center',justifyContent: 'center',
    borderRadius: 10,}} {...rest}
    
     onPress={(event,style) => { 
      


      if (isToggled){
          setToggled(false);
          setColor("#FFFFFF");
        }
        else{
          setToggled(true);
          setColor("#98FB98");
        }

      onClickCallback(!isToggled); //isToggled not updated yet
     }}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
    
  );
};

export default PreferenceButton;

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