import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputBox from '../../components/Form/InputBox'


import { useDispatch,useSelector } from 'react-redux'
import { login } from '../../redux/features/auth/userActions'
import { useReduxStateHook } from '../../hooks/CustomHook'

const Login = ({navigation}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const loginImg="https://imgs.search.brave.com/PzngAPChR2G1EghyNpeb6l57-C-wwF0B_VXbrqZORFw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc"

    const dispatch=useDispatch()

    // const {loading,error,message}=useSelector(state=>state.user)
    const loading=useReduxStateHook(navigation,'home')
    const handleLogin=()=>{
        if(!email || !password){
            return alert("please add email or password")
        }
        dispatch(login(email,password))
        // alert('Login Successfully')
        // navigation.navigate('Home')
    }

    // life cycle
    // useEffect(()=>{
    //     if(error){
    //         alert(error)
    //         dispatch({type:'clearError'})
    //     }
    //     if(message){
    //         alert(message)
    //         dispatch({type:'clearMessage'})
    //         navigation.navigate('Home')
    //     }
    // },[error,message,dispatch])
  return (
    <View style={styles.container}>
        <Image source={{uri:loginImg}} style={styles.img} />
        {loading && <Text>loading....</Text>}
      <InputBox placeholder={"Enter Your email"} autoComplete={"email"} value={email} setValue={setEmail} />
      <InputBox placeholder={"Enter Your password"} secureTextEntry={true} value={password} setValue={setPassword}  />
      <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.loginBtn} onPress={()=>handleLogin()}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text>
        Not registered ? 
        <TouchableOpacity onPress={()=>navigation.navigate('register')}>
            <Text style={styles.registerTxt}>Register here</Text>
        </TouchableOpacity>
      </Text>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
    },
    btnContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        height:200,
        width:'100%',
        resizeMode:'contain'

    },
    loginBtn:{
        backgroundColor:'#000000',
        width:250,
        justifyContent:'center',
        height:40,
        marginVertical:20,
        borderRadius:15
    },
    loginBtnText:{
        color:"#ffffff",
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'500',
        fontSize:18,

    },
    registerTxt:{
        color:'blue',
        marginLeft:5
    }

})
export default Login