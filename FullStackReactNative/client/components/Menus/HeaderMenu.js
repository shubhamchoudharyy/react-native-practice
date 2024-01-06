import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HeaderMenu = ({navigation}) => {
    const [state,setState]=useContext(AuthContext)
    // logout
    const handleLogout = async () => {
        try {
          setState({ token: '', user: null });
          await AsyncStorage.removeItem('@auth');
          alert('Logout Successfully');
        
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" color={"red"} style={styles.iconStyle}/>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        margin:10,
        justifyContent:'space-between'
    },
    iconStyle:{
        marginBottom:3,
        alignSelf:'center',
        fontSize:25
    }
})

export default HeaderMenu