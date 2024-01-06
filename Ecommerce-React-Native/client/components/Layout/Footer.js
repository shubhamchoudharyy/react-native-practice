import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useReduxStateHook } from '../../hooks/CustomHook'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/userActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Footer = () => {
    const Route=useRoute();
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const loading=useReduxStateHook(navigation,'login')
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuContainer}
      onPress={()=>navigation.navigate('Home')}
      >
        <Icon name='home' style={[styles.icon, Route.name==='Home' && styles.active]}   />
        <Text style={[styles.iconText, Route.name==='Home' && styles.active]} >Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}
      onPress={()=>navigation.navigate('notification')}
      >
        <Icon name='bells' style={[styles.icon, Route.name==='notification' && styles.active]}   />
        <Text style={[styles.iconText, Route.name==='notification' && styles.active]} >Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}
      onPress={()=>navigation.navigate('account')}
      >
        <Icon name='user' style={[styles.icon, Route.name==='account' && styles.active]}   />
        <Text style={[styles.iconText, Route.name==='account' && styles.active]} >account</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.menuContainer}
      onPress={()=>navigation.navigate('cart')}
      >
        <Icon name='shoppingcart' style={[styles.icon, Route.name==='cart' && styles.active]}   />
        <Text style={[styles.iconText, Route.name==='cart' && styles.active]} >Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}
      onPress={async()=>{
        dispatch(logout())
        await AsyncStorage.removeItem("@auth")
      }}
      >
        <Icon name='logout' style={styles.icon}   />
        <Text style={styles.iconText} >Logout</Text>
      </TouchableOpacity>
   
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        zIndex:999,
        backgroundColor:'#ffffff',
     
    },
    menuContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        fontSize:25,
        color:'#000000'
    },
    iconText:{
        color:'#000000',

    },
    active:{
        color:'blue'
    }
})
export default Footer