import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';
import axios from 'axios';

const MyPosts = () => {
 

  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(false)

  const getUserPosts=async()=>{
    setLoading(true)
    try{
      const {data}=await axios.get('/post/get-user-posts')
      console.log(data)
      setLoading(false)
      setPosts(data?.posts)
      
    }catch(error){
      console.log(error)
      setLoading(false)
      alert(error)
    }
  }
  console.log(posts)

  useEffect(()=>{
    getUserPosts();
  },[])
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard  posts={posts} myPostScreen={true}/>
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

export default MyPosts