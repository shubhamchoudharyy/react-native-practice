import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import DiceOne from '../assets/inverted-dice-1.png';
import DiceTwo from '../assets/inverted-dice-2.png';
import DiceThree from '../assets/inverted-dice-3.png';
import DiceFour from '../assets/inverted-dice-4.png';
import DiceFive from '../assets/inverted-dice-5.png';
import DiceSix from '../assets/inverted-dice-6.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dice = ({ imageUrl }: DiceProps): JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};


export default function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);

  const rollDiceOnTap=()=>{
    let randomNumber=Math.floor(Math.random()*6)+1;

    switch(randomNumber){
      case 1:
        setDiceImage(DiceOne);
        break;
      
      case 2:
        setDiceImage(DiceTwo);
        break;
      
      case 3:
        setDiceImage(DiceThree);
        break;
      
      case 4:
        setDiceImage(DiceFour);
        break;
      
      case 5:
        setDiceImage(DiceFive);
        break;
      
      case 6:
        setDiceImage(DiceSix);
        break;
      
        default:
          setDiceImage(DiceOne);
          break;
      
    }
    ReactNativeHapticFeedback.trigger("impactLight", options);
  }
  return (
    <View style={styles.container}>
    
      <Dice imageUrl={diceImage} />
      <Pressable 
      onPress={rollDiceOnTap}>
        <Text style={styles.rollDiceBtnText}>Roll the dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff2f2',
  },
  text:{
    color:'rgb(0, 0, 0)'
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#e5e0ff',
    fontSize: 16,
    color: '#8ea7e9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
