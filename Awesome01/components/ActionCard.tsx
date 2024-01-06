import { Image, Linking, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ActionCard() {
    function openWebsite(website:string){
        Linking.openURL(website)
    }
  return (
    <View>
      <Text style={styles.headingText}>Blog Card</Text>
      <View style={[styles.card,styles.cardElevated]}>
        <View style={styles.headingContainer}>
            <Text style={styles.headerText}>
                What's new in JavaScript 21 - ES12
            </Text>
        </View>
        <Image 
        style={styles.cardImage}
        source={{uri:'data:image/png;base64,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'}}/>
        <View style={styles.bodyContainer}>
            <Text numberOfLines={3}>
            JavaScript is a scripting or programming language that allows you to implement complex features on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes
            </Text>
        </View>
        <View style={styles.footerContainer}>
           
            <TouchableOpacity style={styles.socialLinks}
            onPress={()=> openWebsite('https://www.w3schools.com/js/js_intro.asp')}>
                <Text style={styles.cardLink}> Read More</Text>
            </TouchableOpacity>
       
           
            <TouchableOpacity style={styles.socialLinks}
            onPress={()=> openWebsite('https://www.w3schools.com/js/js_intro.asp')}>
                <Text style={styles.cardLink}> Follow Me</Text>
            </TouchableOpacity>
           
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8,
      },
      card:{
        width:350,
        height:340,
        borderRadius:6,
        marginVertical:12,
        marginHorizontal:16
      },
      cardElevated:{
        backgroundColor:'#E07C24',
        elevation:3,
        shadowOffset:{
          width:1,
          height:1
        },
        shadowColor:'#333',
        shadowOpacity:0.4,
      },
      headingContainer:{
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      headingText:{
        color:'#000',
        fontSize:16,
        fontWeight:'600',
      },
      cardImage:{
        height:100,
        marginBottom:8,
        borderTopLeftRadius:6,
        borderTopRightRadius:6,

      },
      bodyContainer:{
        padding:10,
      },
      footerContainer:{
        padding:8,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
      },
      socialLinks:{
        fontSize:16,
        width:100,
        color:'#000',
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:8
      },
      cardLink:{
        color:'#000'
      }
})