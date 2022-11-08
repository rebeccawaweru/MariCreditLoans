import React,{useEffect, useState} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'
import {createDrawerNavigator, DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import client from '../api/client';
import Home from './Home';
import ProfilePage from './ProfilePage';
import LoginScreen from '../screens/LoginScreen';


function Loans(){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>Tasks</Text>
        </View>
    )
}
const Drawer= createDrawerNavigator();
const CustomDrawer = (props, {navigation})=>{
    const [fullname,setfullName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [email,setEmail] = useState('')
    const id = localStorage.getItem('id')
    useEffect(()=>{
        client.get('/auth/'+id)
        .then((response)=>{
         setfullName(response.data.user.fullname);
         setAvatar(response.data.user.avatar)
         setEmail(response.data.user.email)
      })   
    })
    const handleLogout = ({navigation}) =>{
        localStorage.removeItem('id');
        localStorage.removeItem('phone')
        navigation.navigate("LoginScreen")
    }

  return(
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props}>
      <View style={{
      flexDirection:"row", 
      justifyContent:"space-between", 
      alignItems:"center",
      backgroundColor:"whitesmoke",
      padding:20,
      marginBottom:20
      }}>
     <View>
        <Text>{fullname}</Text>
        <Text>{email}</Text>
    </View>
    <Image source={avatar} style={{width:60, height:60, borderRadius:30}}/>
    </View>
      <DrawerItemList {...props} />
     </DrawerContentScrollView> 
     <TouchableOpacity style={{
         right:0,
         left:0, 
         bottom:0, 
         backgroundColor:"green",
         padding:20
         }} onPress={handleLogout}>
      <Text style={{textAlign:"center"}}>Logout</Text>
     </TouchableOpacity>
  
      </View>
  )
}
const DrawerNavigator = ()=>{
    return (
    <Drawer.Navigator
    screenOptions={{
        headerShown:"true",
        headerStyle:{
            backgroundColor:'green',
            elevation:0,
            shadowOpacity:0,
           
        },
        headerTitleStyle: {
            color: 'white'
          },
        headerTitle:'MariCredit'
    }}
     drawerContent={(props)=><CustomDrawer {...props}/>}>
        <Drawer.Screen component={Home} name='Home'/>
        <Drawer.Screen component={ProfilePage} name="Profile"/>
        {/* <Drawer.Screen component={ApplyLoan} name='Apply for Loan'/> */}
    </Drawer.Navigator>
    )
}
export default function Dashboard({navigation}){
    return (
     
            <DrawerNavigator/>
   
    )
}



