/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// screens
import Home from './screens/Home';
import Details from './screens/Details';

export type RootStackParamList={
  Home:undefined;
  Details:{productId:string}
};

const Stack=createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
        name='Home' 
        component={Home}
        options={{
          title:'Trending Products'
        }}/>
        <Stack.Screen 
        name='Details' 
        component={Details}
        options={{
          title:'Product Details'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
