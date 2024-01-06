import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import InputBox from '../../components/Forms/InputBox'
import SubmitButton from '../../components/Forms/SubmitButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
const Login = ({navigation}) => {
    // global state
    const [state,setState]=useContext(AuthContext)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)

    const handleSubmit=async()=>{
        try{
            setLoading(true)
            if(!email || !password){
                Alert.alert('Please fill all fields')
                setLoading(false)
                return;
              
            }
            setLoading(false)
            const {data}=await axios.post('/auth/login',{email,password})
            alert(data && data.message);
            setState(data)
            await AsyncStorage.setItem('@auth',JSON.stringify(data));
            
            console.log("Login Data==> ",{email,password})
            navigation.navigate('Home')
            
        }catch(error){
            alert(error.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }

    // temp fnx to check local storage data
    const getLoacalStorageData=async()=>{
        let data =await AsyncStorage.getItem('@auth');
        console.log('Local Storage ==> ',data)
    };
    getLoacalStorageData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{marginHorizontal:20}}>
      
      <InputBox inputTitle={'Email'} value={email} setValue={setEmail}
      keyboardType="email-address" autoComplete="email"
      />
      <InputBox inputTitle={'Password'} value={password} setValue={setPassword}
       autoComplete="password" secureTextEntry={true}/>
      </View>
      {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
      <SubmitButton btnTitle='Login' loading={loading} handleSubmit={handleSubmit} />
      <Text style={styles.linkTxt}>
        Not a user Please <Text style={styles.link}
        onPress={()=>navigation.navigate("Register")}> Register</Text>{" "}
      </Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#e1d5c9'

    },
    pageTitle:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        color:'#1e2225',
        marginBottom: 20
    },
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:'#ffffff',
        borderRadius:10,
        marginTop:10,
        paddingLeft:10,
        color:'#af9f85',
    },
    linkTxt:{
        textAlign:'center',
    },
    link:{
        color:'red'
    }
})
export default Login