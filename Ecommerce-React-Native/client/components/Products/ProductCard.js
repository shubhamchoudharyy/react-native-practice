import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({p}) => {
    const navigation=useNavigation();
   
    const handleMoreBtn=(id)=>{
        navigation.navigate('ProductDetails',{_id:id});
        console.log(id)

    }

    const handleCart=()=>{
        alert('Item added to cart')
    }
  return (
    <View>
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri:p?.imageUrl}} />
            <Text style={styles.cardTitle}>{p?.name}</Text>
            <Text style={styles.cardDesc}>{p?.description.substring(0,30)} ...more</Text>
            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.btn} onPress={()=>handleMoreBtn(p?._id)}>
                    <Text style={styles.btnText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCart} onPress={()=>handleCart()}>
                    <Text style={styles.btnText}>
                        {
                        p?.quantity > 0 ? 'Add to Cart' :'Out of Stock'
                        }
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    card:{
        borderWidth:1,
        borderColor:'lightgray',
        marginVertical:5,
        marginHorizontal: 8 ,
        width:'45%',
        padding:10,
        backgroundColor:'#ffffff',
        justifyContent:'center'
    },
    cardImage:{
        height:120,
        width:'100%',
        marginBottom:10,
    },
    cardTitle:{
        fontSize:10,
        fontWeight:'bold',
        marginBottom:5,
    },
    cardDesc:{
        fontSize:10,
        textAlign:'left'
    },
    BtnContainer:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    btn:{
        backgroundColor:'#000000',
        height:20,
        width:70,
        borderRadius:5,
        justifyContent:'center',

    },
    btnCart:{
        backgroundColor:'orange',
        height:20,
        width:70,
        borderRadius:5,
        justifyContent:'center',

    },
    btnText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:10,
        fontWeight:'bold',
    }

})
export default ProductCard