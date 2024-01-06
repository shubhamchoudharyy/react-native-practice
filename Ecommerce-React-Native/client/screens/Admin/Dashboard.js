import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import Icon from 'react-native-vector-icons/AntDesign'
const Dashboard = () => {
  return (
    <Layout>
      <View style={styles.main}>
        <Text style={styles.heading}>Dashboard</Text>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
                <Icon name="edit"  style={styles.icon}/>
                <Text style={styles.btnText}>Manage Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Icon name="edit"  style={styles.icon}/>
                <Text style={styles.btnText}>Manage Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Icon name="user"  style={styles.icon}/>
                <Text style={styles.btnText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Icon name="bars"  style={styles.icon}/>
                <Text style={styles.btnText}>Manage Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Icon name="info"  style={styles.icon}/>
                <Text style={styles.btnText}>About App</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Layout>
  )
}

const styles=StyleSheet.create({
    main:{
        backgroundColor:'lightgray',
        height:'96%',
    },
    heading:{
        backgroundColor:'#000000',
        color:'#ffffff',
        textAlign:'center',
        padding:20,
        fontSize:20,
        margin:10,
        borderRadius:5,
        fontWeight:'bold',
    },
    btnContainer:{
        margin:10,
    },
    btn:{
        flexDirection:'row',
        alignItems:"center",
        backgroundColor:'#ffffff',
        padding:10,
        borderRadius:10,
        elevation:10,
        marginBottom:20
    },
    icon:{
        fontSize:25,
        marginRight: 20,
        marginLeft:20
    },
    btnText:{
        fontSize:18,
    }
})
export default Dashboard