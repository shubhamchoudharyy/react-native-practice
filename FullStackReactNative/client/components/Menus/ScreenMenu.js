import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../../screens/auth/Register'
import Login from '../../screens/auth/Login'
import Home from '../../screens/Home'
import { AuthContext } from '../../context/authContext'
import HeaderMenu from './HeaderMenu'
import Post from '../../screens/Post'
import Account from '../../screens/Account'
import About from '../../screens/About'

import MyPosts from '../../screens/MyPosts'

const ScreenMenu = () => {
    // global state
    const [state]=useContext(AuthContext)
    // auth condition
    const authenticateUser=state?.user && state?.token 
    const Stack=createNativeStackNavigator()
  return (
        <Stack.Navigator initialRouteName="Login">
            {authenticateUser ? (
                <>
                     <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{title:'Full Stack App'
                        ,headerRight:()=><HeaderMenu />}}
                    />
                     <Stack.Screen
                        name="Post"
                        component={Post}
                        options={{title:'Full Stack App'
                        ,headerRight:()=><HeaderMenu />}}
                    />
                     <Stack.Screen
                        name="Account"
                        component={Account}
                        options={{title:'Full Stack App'
                        ,headerRight:()=><HeaderMenu />}}
                    />
                     <Stack.Screen
                        name="MyPosts"
                        component={MyPosts}
                        options={{title:'Full Stack App'
                        ,headerRight:()=><HeaderMenu />}}
                    />
                </>
            ) : (
                <>
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                />
                
                </>
            ) }
          
        </Stack.Navigator>
  )
}

export default ScreenMenu