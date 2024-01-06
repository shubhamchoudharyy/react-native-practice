import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// form validation
import * as Yup from 'yup';
import { Formik } from 'formik';

const PasswordSchema=Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,'Should be min of 4 characters')
  .max(16,'Should be max of 16 characters')
  .required('Length is required')
})
export default function App() {
  const [password,setPassword]=useState('');
  const [isPasswordGenerated,setIsPasswordGenerated]=useState(false);

  const [lowercase,setLowerCase]=useState(true);
  const [uppercase,setUpperCase]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [symbols,setSymbols]=useState(false);
  const generatePasswordString=(passwordLength:number)=>{
    let characterList='';

    const upperCaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars='abcdefghijklmnopqrstuvwxyz';
    const digitChars='0123456789';
    const specialChars='!@#$%^&*()_+';

    if(uppercase){
      characterList+=upperCaseChars;
    }
    if(lowercase){
      characterList+=lowerCaseChars;
    }
    if(numbers){
      characterList+=digitChars;
    }
    if(symbols){
      characterList+=specialChars;
    }

    const passwordResult=createPassword(characterList,passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);

  };
  const createPassword=(characters:string,passwordLength:number)=>{
    let result='';
    for(let i=0;i<passwordLength;i++){
      const characterIndex= Math.round(Math.random() * characters.length)
      result+=characters.charAt(characterIndex)
    }
    return result;
    console.log("shubham")
  };
  const resetPassowrdState=()=>{
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appcontainer}>
        <View style={styles.container}>
        <Text>Password Generator</Text>
      <Formik
       initialValues={{ passwordLength:'' }}
       validationSchema={PasswordSchema}
       onSubmit={values=>{
        console.log(values)
        generatePasswordString(Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
  <View style={styles.inputWrapper}>
    <View style={styles.inputColumn}>
      <Text style={styles.heading}>Password Length</Text>
      {touched.passwordLength && errors.passwordLength && (
        <Text style={styles.errorText}>
          {errors.passwordLength}
        </Text>
      )}
      <TextInput
        style={styles.inputStyle}
        value={values.passwordLength}
        onChangeText={handleChange('passwordLength')}
        placeholder='Ex. 8'
        keyboardType='numeric'
      />
    </View>
  </View>

  {/* Additional input wrappers go here */}
  <View style={styles.inputWrapper}>
    <Text style={styles.heading}>Include lowercase</Text>
    <BouncyCheckbox disableBuiltInState
     isChecked={lowercase} 
     onPress={()=>setLowerCase(!lowercase)}
      fillColor='#29ab87'/>
  </View>
  <View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include Uppercase</Text>
    <BouncyCheckbox disableBuiltInState
     isChecked={uppercase} 
     onPress={()=>setUpperCase(!uppercase)}
      fillColor='#a9771b'/>
  </View>
  <View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include Numbers</Text>
    <BouncyCheckbox disableBuiltInState
     isChecked={numbers} 
     onPress={()=>setNumbers(!numbers)}
      fillColor='#4a29ab'/>
  </View>
  <View style={styles.inputWrapper}>
  <Text style={styles.heading}>Include Symbols</Text>
    <BouncyCheckbox disableBuiltInState
     isChecked={symbols} 
     onPress={()=>setSymbols(!symbols)}
      fillColor='#29ab87'/>
  </View>

  <View style={styles.formActions}>
    <TouchableOpacity disabled={!isValid}
    style={styles.primrybtn}
    onPress={handleSubmit}>
      <Text>Generate Password</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.secondbtn}
    onPress={()=>{
      handleReset();
      resetPassowrdState();
    }}>
      <Text  style={styles.secondarybtn}>Reset</Text>
    </TouchableOpacity>
  </View>
</>

       )}
     </Formik>
     </View>
     {isPasswordGenerated ? (
      <View style={[styles.card, styles.elevated]}>
        <Text style={styles.subTitle} >Result:</Text>
        <Text style={styles.description} >Long Press to Copy</Text>
        <Text selectable={true} style={styles.subTitle} >{password}</Text>
      </View>
     ):null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})