
import { server } from "../../store";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

// action login
export const login=(email,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:'loginRequest'
        })
        const {data}=await axios.post(`${server}/user/login`,
        {email,password},
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:'loadingSuccess',
            payload:data,

        })
        await AsyncStorage.setItem("@auth",data?.token)
    }catch(error){
        dispatch({
            type:'loginFail',
            payload:error.response.data.message
        })
    }
}

// register
export const register=(formData)=>async(dispatch)=>{
    try{
        dispatch({
            type:'registerRequest',

        })
        const {data}=await axios.post(`${server}/user/register`,formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        dispatch({
            type:'registerSuccess',
            payload:data.message
        })

    }catch(error){
        console.log(error)
        dispatch({
            type:'registerFail',
            payload:error.response.data.message
        })
    }
}

// get user data action
export const getUserData=(email,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:'getUserDataRequest'
        })
        const {data}=await axios.post(`${server}/user/profile`,
        {email,password},
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:'getUserDataSuccess',
            payload:data?.user
        })
    }catch(error){
        dispatch({
            type:'getUserDataFail',
            payload:error.response.data.message
        })
    }
}

// logout action
export const logout=(email,password)=>async (dispatch)=>{
    try{
        dispatch({
            type:'logoutRequest'
        })
        const {data}=await axios.post(`${server}/user/logout`)
        
        dispatch({
            type:'logoutSuccess',
            payload:data?.message
        })
    }catch(error){
        dispatch({
            type:'logoutFail',
            payload:error.response.data.message
        })
    }
}