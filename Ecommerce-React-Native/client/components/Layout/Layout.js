import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
    {/* <View style={styles.container}> */}
    <StatusBar/>
    <View>{children}</View>
    <View style={styles.footer}>
    <Footer />
    </View>
    {/* </View> */}
    </>
  )
}

const styles=StyleSheet.create({
    // container:{
    //     backgroundColor:'red',
    //     flex:1,
    //     height:'100%',
    //     justifyContent:'space-between'
    // },
    footer:{
        width:'100%',
        flex:1,
        justifyContent:'flex-end',
        zIndex:999,
        borderTopWidth:1,
        position:'absolute',
        bottom:0,
        padding:10,
        borderColor:'lightgray',
      



    }
})

export default Layout