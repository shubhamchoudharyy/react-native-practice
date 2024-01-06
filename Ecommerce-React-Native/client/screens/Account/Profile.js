import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { userData } from '../../data/UserData'
import InputBox from '../../components/Form/InputBox'

const Profile = ({navigation}) => {
    const [email,setEmail]=useState(userData?.email)
    const [profilePic,setProfilePic]=useState(userData?.image)
    const [password,setPassword]=useState(userData?.password)
    const [name,setName]=useState(userData?.name)
    const [address,setAddress]=useState(userData?.address)
    const [city,setCity]=useState(userData?.city)
    const [contact,setContact]=useState(userData?.contact)

    const handleUpdate=()=>{
        if(!email || !password || !name || !address || !city || !contact){
            return alert("please fill all field")
        }
        alert('Updated Successfully')
        navigation.navigate('login')
    }
  return (
    <Layout>
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{uri:profilePic}} />
                    <Pressable onPress={()=>alert('profile dialogbox')}>
                        <Text style={{color:'red'}}> Update Your Profile Pic </Text>
                    </Pressable>
                </View>
                <InputBox value={name} 
                setValue={setName} 
                placeholder={'enter your name'} 
                autoComplete={'name'} />
                <InputBox value={email} 
                setValue={setEmail} 
                placeholder={'enter your email'} 
                autoComplete={'email'} />
                <InputBox value={password} 
                setValue={setPassword} 
                placeholder={'enter your password'} 
               secureTextEntry={true} />
                <InputBox value={address} 
                setValue={setAddress} 
                placeholder={'enter your address'} 
                autoComplete={'address-line1'} />
                <InputBox value={city} 
                setValue={setCity} 
                placeholder={'enter your city'} 
                autoComplete={'country'} />
                <InputBox value={contact} 
                setValue={setContact} 
                placeholder={'enter your contact'} 
                autoComplete={'tel'} />
                <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
                    <Text style={styles.btnUpdateText}>Update Profile</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
     
    </Layout>
  )
}

const styles=StyleSheet.create({
    container:{
        marginVertical:20,
    },
    imgContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        height:100,
        width:'100%',
        resizeMode:'contain'
    },
    btnUpdate:{
        backgroundColor:'#000000',
        height:40,
        borderRadius:20,
        marginHorizontal:30,
        justifyContent:'center',
        marginTop:10,
    },
    btnUpdateText:{
        fontSize:18,
        color:'#ffffff',
        textAlign:'center'
    }
})

export default Profile