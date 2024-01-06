import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import EditModal from './EditModal'
const PostCard = ({posts,myPostScreen}) => {
  // handle delete
  const [loading,setLoading]=useState(false)
  const [modalVisible,setModalVisible]=useState(false)
  const [post,setPost]=useState([])
  const navigation=useNavigation()
  const handleDeletePrompt=(id)=>{
    Alert.alert('Attention!', 'Are You Sure want to delete this post ?',
    [{
      text:'Cancel',
      onPress: ()=>{console.log('cancel press')}
    },{
      text:'Delete',
      onPress:()=>{handleDeletePost(id)}
    }])
  }

  const handleDeletePost=async(id)=>{
    try{
      setLoading(true)
      const {data}=await axios.delete(`/post/delete-post/${id}`)
      setLoading(false)
      alert(data?.message)
      navigation.push('MyPosts')
    }catch(error){
      console.log(error)
      setLoading(false)
      alert(error)
    }

  }
  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen &&
      <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} post={post}/>}
      {posts?.map((post,i)=>(
        <View key={i}>
        <View style={styles.card}>
          {/* {myPostScreen && ( */}
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <Text style={{marginHorizontal:20}}>
              <FontAwesome5 name="trash" size={16} color={"red"} onPress={()=>handleDeletePrompt(post?._id)}/>
            </Text>
            <Text style={{textAlign:'right'}}>
              <FontAwesome5 name="pen" size={16} color={"darkblue"}  onPress={() =>{setPost(post), setModalVisible(true)}}/>
            </Text>
          </View>
          {/* )} */}
          
            <Text style={styles.title}>Title: {post?.title}</Text>
            <Text style={styles.desc}>{post?.description}</Text>
          
            
        </View>
        <View style={styles.footer}>
          
            <Text>
              {"  "}
              <FontAwesome5 name="user" color={"orange"}/> {" "}
              {post?.postedBy?.name}</Text>
            <Text> 
            {"  "}
              <FontAwesome5 name="clock" color={"orange"}/> {" "}
              {moment(post?.createdAt).format('DD:MM:YYYY') }</Text>
        </View>
        </View>
      ))}
    </View>
  )
}

const styles=StyleSheet.create({
    heading:{
        color:'green'
    },
    card:{
        width:'100%',
        backgroundColor:'#ffffff',
        borderWidth:0.2,
        borderColor:'gray',
        padding:20,
        borderRadius:5,
        marginVertical:10,

    },
    title:{
        fontWeight:"bold",
        borderBottomWidth:0.3,
        marginBottom:10,
    },
    footer:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:20,
    },
    desc:{
      marginTop:10
    }
  
})
export default PostCard