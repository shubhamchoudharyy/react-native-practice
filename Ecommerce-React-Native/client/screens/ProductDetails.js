import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductData } from '../data/ProductData';
import Layout from '../components/Layout/Layout';

const ProductDetails = ({route}) => {
    const {params}=route;

    const [pDetails,setPDetails]=useState({})
    const [qty,setQty]=useState(1)
    useEffect(()=>{
        const getProduct=ProductData.find((p)=>{
            return p?._id === params?._id
        })
        setPDetails(getProduct)
    },[params?._id])
    
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
    <Layout>
        <Image style={styles.image} source={{uri:pDetails?.imageUrl}}/>
        <View style={styles.container}>
        <Text style={styles.title}>{pDetails?.name}</Text>
        <Text style={styles.title}>Price : {pDetails?.price}</Text>
        <Text style={styles.desc}>{pDetails?.description}</Text>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnCart}
            onPress={()=>alert(`${qty} items added to cart`)}
            disabled={pDetails?.quantity <=0} >
                <Text style={styles.btnCartText}>
                    {
                        pDetails?.quantity > 0 ? 'Add to Cart' :'Out of Stock'
                    }
                </Text>
            </TouchableOpacity>
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
        </View>
        
    </Layout>
  )
}

const styles=StyleSheet.create({
    image:{
        height:300,
        width:'100%'
    },
    title:{
        fontSize:14,
        textAlign:'left'
    },
    container:{
        marginVertical:15,
        marginHorizontal:10
    },
    desc:{
        fontSize:12,
        textTransform:'capitalize',
        textAlign:'justify',
        marginVertical:10
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
export default ProductDetails