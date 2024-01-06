import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CartData } from '../data/CartData'
import PriceTable from '../components/cart/PriceTable'
import Layout from '../components/Layout/Layout'
import CartItem from '../components/cart/CartItem'

const Cart = ({navigation}) => {
    const [cartItem,setCartItem]=useState(CartData)
  return (
    <Layout>
      <Text style={styles.heading}>
        {
            cartItem?.length > 0 ? `You have ${cartItem?.length} item in your cart` 
            : 'Your Shopping cart is empty'
        }
      </Text>
      {
        cartItem?.length> 0 && (
            <>
            <ScrollView>
                {cartItem?.map(item=>(
                    <CartItem item={item} key={item._id} />
                ))}
            </ScrollView>
            
            <View>
                <PriceTable title={'Price'} price={999} />
                <PriceTable title={'Tax'} price={1} />
                <PriceTable title={'Shipping'} price={1} />
                <View style={styles.grandTtl}> 
                <PriceTable title={'Grand Total'} price={1001} />
                </View>
            </View>
            <TouchableOpacity style={styles.btnCheckout} onPress={()=>navigation.navigate('checkout')} >
                <Text style={styles.btnCheckoutText}>Checkout</Text>
            </TouchableOpacity>
            
            </>
        )
      }
    </Layout>
  )
}

const styles=StyleSheet.create({
    heading:{
        textAlign:'center',
        color:'green',
        marginTop:10 ,
    },
    grandTtl:{
        borderWidth:1,
        borderColor:'lightgray',
        backgroundColor:'#ffffff',
        padding:5,
        margin:5,
        marginHorizontal:20 ,
    },
    btnCheckout:{
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        height:40,
        backgroundColor:'#000000',
        width:'90%',
        marginHorizontal:20,
        borderRadius:20,
    },
    btnCheckoutText:{
        color:'#ffffff',
        fontWeight:'bold',
        fontSize:18,

    }
})
export default Cart