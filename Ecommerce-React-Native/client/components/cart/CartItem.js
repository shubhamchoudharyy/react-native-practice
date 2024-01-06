import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const CartItem = ({item}) => {
    const [qty,setQty]=useState(1)

    const handleAddQty=()=>{
        if(qty===10){
            alert('Can not order more than 10')
        }else{
            setQty((prev)=>prev+1)
        }

    }
    const handleRmQty=()=>{
        if(qty <=1 ){
            return;
        }
            setQty((prev)=>prev-1)
    }
  return (
    <View style={styles.container}> 
        <Image style={styles.image} source={{uri:item?.imageUrl}} />
        <View style={styles.title}>
        <Text style={styles.name}> {item?.name}</Text>
        <Text style={styles.name}> Price :{item?.price} $</Text>
        </View>
        <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnQty}>
                    <Text style={styles.btnQtyText} onPress={()=>handleRmQty()}>-</Text>
                </TouchableOpacity>
                <Text style={styles.btnQtyText}>{qty}</Text>
                <TouchableOpacity style={styles.btnQty} onPress={()=>handleAddQty()}>
                    <Text style={styles.btnQtyText}>+</Text>
                </TouchableOpacity>
        </View>
     
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        margin:10,
        backgroundColor:'#ffffff',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',

    },
    image:{
        width:50,
        height:50
    },
    title:{
        width:200,
        flex:1
    },
    name:{
        fontSize:10,


    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
        marginHorizontal:10
    },
    btnCart:{
        width:180,
        backgroundColor:"#000000",
        // marginVertical: 5,
        borderRadius:5,
        height:40,
        justifyContent:'center'
    },
    btnCartText:{
        color:'#ffffff',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:16
    },
    btnQty:{
        backgroundColor:'lightgray',
        width:30,
        alignItems:'center',
        marginHorizontal:10,

    },
    btnQtyText:{
        fontSize:20,
        fontWeight:'bold'
    }
})

export default CartItem