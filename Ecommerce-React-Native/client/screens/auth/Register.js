import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../components/Form/InputBox'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/features/auth/userActions'
import { useReduxStateHook } from '../../hooks/CustomHook'

const Register = ({navigation}) => {
    const dispatch=useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [country,setCountry]=useState('')
    const [contact,setContact]=useState('')
    const [answer,setAnswer]=useState('')
    const loginImg="https://imgs.search.brave.com/PzngAPChR2G1EghyNpeb6l57-C-wwF0B_VXbrqZORFw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc"

    const handleRegister=()=>{
        if(!email || !password || !name || !address || !city || !contact){
            return alert("please fill all field")
        }
        // alert('Registered Successfully')
        // navigation.navigate('login')
        const formData={
            email,password,name,address,city,contact,answer,country:'India'
        }
        dispatch(register(formData))
    }
    const loading=useReduxStateHook(navigation,'login')
    return (
        <View style={styles.container}>
            <Image source={{uri:loginImg}} style={styles.img} />
          <InputBox placeholder={"Enter Your name"} autoComplete={"name"} value={name} setValue={setName} />
          <InputBox placeholder={"Enter Your email"} autoComplete={"email"} value={email} setValue={setEmail} />
          <InputBox placeholder={"Enter Your password"} secureTextEntry={true} value={password} setValue={setPassword}  />
          <InputBox placeholder={"Enter Your Address"} autoComplete={'address-line1'} value={address} setValue={setAddress}  />
          <InputBox placeholder={"Enter Your City"} autoComplete={'country'} value={city} setValue={setCity}  />
          <InputBox placeholder={"Enter Your Contact"}  value={contact} setValue={setContact} autoComplete={'tel'}  />
          <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={()=>handleRegister()}>
            <Text style={styles.loginBtnText}>Register</Text>
          </TouchableOpacity>
          <Text>
            Already registered ? 
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                <Text style={styles.registerTxt}>login here</Text>
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
export default Register