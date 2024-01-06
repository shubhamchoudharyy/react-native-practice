import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const Header = () => {
    const [searchText,setSearchText]=useState('')

    const handleSearch=()=>{
        console.log(searchText);
        setSearchText('')
    }
  return (
  <View style={{height:90, backgroundColor:'lightgray'}}>
    <View style={styles.container}>
    <TextInput style={styles.inputBox} value={searchText} onChangeText={(text)=>setSearchText(text)} />
    <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Icon name='trademark' style={styles.icon} />
    </TouchableOpacity>
    </View>
  </View>
      
    
  )
}
const styles=StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
    },
    inputBox:{
        borderWidth:0.3,
        width:'100%',
        position:'absolute',
        left:15,
        height:40,
        color:'#000000',
        backgroundColor:'#ffffff',
        paddingLeft:10,
        fontSize:16,
        borderRadius:5,
    },
    searchBtn:{
        position:'absolute',
        left:'95%',

    },
    icon:{
        color:'#000000',
        fontSize:18
    }
})
export default Header