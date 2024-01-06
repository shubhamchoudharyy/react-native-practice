import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Home from './screens/Home';
import About from './screens/About';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Payment from './screens/Payment';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Account from './screens/Account/Account';
import Notification from './screens/Account/Notification';
import Profile from './screens/Account/Profile';
import MyOrders from './screens/Account/MyOrders';
import Dashboard from './screens/Admin/Dashboard';


const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {

    const [isAuth,setIsAuth]=useState(null)

    useEffect(()=>{
        const getUserLocalData=async()=>{
            let data = await AsyncStorage.getItem("@auth")
            setIsAuth(data)
            // let loginData=JSON.parse(data)
            console.log("user login data ==> ",data)
        };
        getUserLocalData();
    },[])
  return (
   
      <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
        
            
            <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="mobile"
            component={About}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="notification" component={Notification} />
          <Stack.Screen name="checkout" component={Checkout} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="adminPanel" component={Dashboard} />
          <Stack.Screen name="myorders" component={MyOrders} />
          
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="account" component={Account} />
          <Stack.Screen name="cart" component={Cart} />

            
            {isAuth && (
                <>
                <Stack.Screen
            name="login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{headerShown: false}}
          />
                
                </>
            )}
            

         

         
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default Main;
