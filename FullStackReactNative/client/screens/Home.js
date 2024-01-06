import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';

const Home = () => {
  // global state
 
  const [posts,getPost]=useContext(PostContext)
  const [refreshing,setRefreshing]=useState(false)

  const onRefresh=useCallback(()=>{
    setRefreshing(true)
    getPost()
    setTimeout(()=>{
      setRefreshing(false)
    },2000)
  },[])
  return (
    <View style={styles.container}>
      <ScrollView
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <PostCard  posts={posts}/>
      {/* <Text>{JSON.stringify(posts,null,4)}</Text> */}
      </ScrollView>
      <View style={{backgroundColor:'#ffffff'}}>
      <FooterMenu/>
      </View>
      
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent: 'space-between',
      margin: 10,
     
  }
})

export default Home