import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../components/Layout/Layout'

const Checkout = ({navigation}) => {
    const handleCOD=()=>{
        
        alert('Your order has been placed successfully')
    }
    const handleOnline=()=>{
        alert('You are redirecting to payment gateway')
        navigation.navigate('payment')
    }
  return (
    <Layout>
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Options</Text>
      <Text style={styles.price}>Total Amount : 101$</Text>
      <View style={styles.paymentCard}>
        <Text style={styles.paymentHeading}>Select your payment mode</Text>
        <TouchableOpacity style={styles.paymentBtn} onPress={()=>handleCOD()}>
            <Text style={styles.paymentBtnText}>Cash on Deslivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentBtn} onPress={handleOnline()}>
            <Text style={styles.paymentBtnText}>Online (Credit | Debit card)</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Layout>
  )
}

const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:'90%',
    },
    heading:{
        fontSize:25,
        fontWeight:'500',
        marginVertical:20,
    },
    price:{
        fontSize:20,
        marginBottom:10,
        color:'gray'
    },
    paymentCard:{
        backgroundColor:'#ffffff',
        width:'90%',
        borderRadius:10,
        padding:30,
        marginVertical:10,
    },
    paymentHeading:{
        color:'gray',
        marginBottom:10,

    },
    paymentBtn:{
        backgroundColor:'#000000',
        height:40,
        borderRadius:10,
        justifyContent:'center',
        marginVertical:10,
    },
    paymentBtnText:{
        color:'#ffffff',
        textAlign:'center',

    }
})
export default Checkout