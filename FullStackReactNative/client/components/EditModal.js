import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';

const EditModal = ({modalVisible,setModalVisible,post}) => {
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [loading,setLoading]=useState(false)
    const navigation=useNavigation()
    const updatePost=async(id)=>{
        try{
            setLoading(true)
            const {data}=await axios.put(`/post/update-post/${id}`,{
                title,
                description
            });
            setLoading(false)
            alert(data?.message)
            navigation.push('MyPosts')
        }catch(error){
            console.log(error)
            setLoading(false)
            alert(error)
        }
    }

    useEffect(()=>{
        setTitle(post?.title)
        setDescription(post?.description)
    },[post])
  return (
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Update Your post</Text>
          <Text>Title</Text>
          <TextInput style={styles.inputBox} value={title} onChangeText={(text)=>setTitle(text)}/>
          <Text>Description</Text>
          <TextInput style={styles.inputBox} numberOfLines={4} value={description} onChangeText={(text)=>setDescription(text)} />
          <View style={{flexDirection:'row'}}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {updatePost(post?._id),setModalVisible(!modalVisible)}}>
            <Text style={styles.textStyle}>Update</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
          </View>
        </View>
      </View>
    </Modal>
 
  </View>
);
};

const styles = StyleSheet.create({
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#2196F3',
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
inputBox:{
    marginBottom:20,
    backgroundColor:'gray',
    borderRadius:10,
    marginTop:10,
    paddingLeft:5,
    width:100,
    height:'auto'
}
});


export default EditModal