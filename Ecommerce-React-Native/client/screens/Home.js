import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import Category from '../components/category/Category'
import Banner from '../components/Banner/Banner'
import Products from '../components/Products/Products'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/features/auth/userActions'

const Home = () => {

    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getUserData())
    },[dispatch])
  return (
   
        <Layout >
            <ScrollView>
            <Header/>
        <Category/>
        <Banner/>
        <Products />
        </ScrollView>
        
    </Layout>
   
    
   
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        alignItems:'center',
        justifyContent:"center"
    }
})
export default Home