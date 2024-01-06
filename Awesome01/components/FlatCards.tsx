import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style={styles.headingText}>FlatCards</Text>
      <View style={styles.container}>
        <View style={styles.cardOne}>
            <Text>Red</Text>
        </View>
        <View style={styles.cardTwo}>
            <Text>Blue</Text>
        </View>
        <View style={styles.cardThree}>
            <Text>Green</Text>
        </View>
        <View style={styles.cardThree}>
            <Text>Green</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8
    },
    container:{
        padding:5,
        flex:1,
        flexDirection:'row'

    },
    cardOne:{
        height:100,
        width:100,
        backgroundColor:'red',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        borderRadius:5
    },
    cardTwo:{
        height:100,
        width:100,
        backgroundColor:'green',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        borderRadius:5,
    },
    cardThree:{
        height:100,
        width:100,
        backgroundColor:'blue',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        borderRadius:5
    },
})