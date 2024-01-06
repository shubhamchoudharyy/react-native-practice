import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import { ProductData } from '../../data/ProductData'

const Products = () => {
  return (
    
    <View style={styles.container}>
      {ProductData.map((p) => (
        <ProductCard key={p?._id} p={p} />
      ))}
    </View>
    
  )
}

const styles=StyleSheet.create({
  container:{
    marginBottom:80
  }
})
export default Products
