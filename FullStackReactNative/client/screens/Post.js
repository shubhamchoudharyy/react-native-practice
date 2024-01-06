import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';
import { PostContext } from '../context/postContext';

const Post = ({navigation}) => {

    const [post,setPost]=useContext(PostContext)

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [loading,setLoading]=useState('')

    // handle form data
    const handlePost=async()=>{
        setLoading(true)
        try{
            
            if(!title || !description){
                alert("please add title and description")
            }
            const {data}=await axios.post('/post/create-post',{title,
                description})
            setLoading(false)
            setPost([...post,data?.post])
            alert(data?.message)
            navigation.navigate('Home')

        }catch(error){
            alert( error.message)
            console.log(error)
            setLoading(false)
            
        }
    }
  return (
    <View style={styles.container}>
        <ScrollView>
        <View style={{alignItems:'center'}}>
        <Text style={styles.heading}>Create a Post</Text>
        <TextInput style={styles.inputBox} placeholder='add post title' placeholderTextColor={"gray"} value={title} onChangeText={(text)=>setTitle(text)} />
        <TextInput style={styles.inputBox} placeholder='add post description' placeholderTextColor={"gray"}
        multiline={true} numberOfLines={6}  value={description} onChangeText={(text)=>setDescription(text)} />
        </View>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>

                <Text style={styles.postBtnTxt}>
                <FontAwesome5 name="plus-square" size={18} />{"  "}
                    Create a Post</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={{flex:1,justifyContent:'flex-end'}}>
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
        marginTop:20,
    },
    heading:{
       textTransform:'uppercase',
        fontSize:25,
        fontWeight:'bold'
    },
    inputBox:{
        backgroundColor:'#ffffff',
        width:320,
        textAlignVertical:'top',
        paddingTop:10,
        marginTop:30,
        fontSize:16,
        paddingLeft:15,
        borderColor:'gray',
        borderWidth:1,
    },
    postBtn:{
        backgroundColor:'black',
        width:300,
        marginTop:30,
        height:40,
        borderRadius:5,
        alignItems:'center',
        justifyContent:"center"
    },
    postBtnTxt:{
        color:'#ffffff',
        fontSize:18,
        fontWeight:'bold'
        }
  })

export default Post