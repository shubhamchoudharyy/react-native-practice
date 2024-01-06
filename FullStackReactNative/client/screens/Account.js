import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';


const Account = () => {
    // global state
    const [state,setState]=useContext(AuthContext);
    const {user}=state;
    // local state
    const [name,setName]=useState(user?.name);
    const [password,setPassword]=useState(user?.password);
    const [email]=useState(user?.email);
    const [loading,setLoading]=useState(false);

    const handleUpdate=async()=>{
        try{
            setLoading(true)
            const {data}=await axios.put('/auth/update-user',{
                name,password,email
            })
            setLoading(false)
            alert("Account updated successfully")
            let UD=JSON.stringify(data)
            setState({...state,user:UD?.updatedUser})

        }catch(error){
            alert(error.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{alignItems:'center'}}>
        <Image source={{uri:'https://imgs.search.brave.com/yvRBUhRHqnvduiPqz0JOch9bKzpikLre4ZcLLnqrH5Y/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudGhlbm91bnBy/b2plY3QuY29tL3Bu/Zy83NzA3OTctMjAw/LnBuZw'}}
        style={{height:200,width:200,borderRadius:100}}
        />
        </View>
        
        <View>
            <Text style={styles.warningText}>You can only update your name and password</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputtxt}>Name</Text>
                <TextInput style={styles.inputBox} value={name} onChangeText={(text)=>setName(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputtxt}>Email</Text>
                <TextInput style={styles.inputBox} value={email} editable={false} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputtxt}>Password</Text>
                <TextInput style={styles.inputBox} value={password} onChangeText={(text)=>setPassword(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputtxt}>Role</Text>
                <TextInput style={styles.inputBox} value={state?.user?.role} editable={false} />
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.update} onPress={handleUpdate}>
                    <Text style={styles.updatebtntxt}>{loading ? "Please Wait" :"Update Profile"}</Text> 
                </TouchableOpacity>
            </View>
        </View>
        <FooterMenu/>
        </ScrollView>
      </View>
    )
  }

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        margin: 10,
        marginTop:40,
    },
    warningText:{
        color:'red',
        fontSize:18,
        textAlign:'center'
    },
    inputContainer:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    inputtxt:{
        fontWeight:'bold',
        width:70,
        color:'gray'
    },
    inputBox:{
        width:250,
        backgroundColor:'#ffffff',
        marginLeft:10,
        fontSize:16,
        paddingLeft:20,
        borderRadius:5
    },
    update:{
        backgroundColor:"black",
        color:'white',
        height:40,
        width:250,
        borderRadius:10,
        marginTop:30,
        alignItems:'center',
        justifyContent:'center'
    },
    updatebtntxt:{
        color:'white',
        fontSize:18
    }
  })
export default Account