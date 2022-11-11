import React,{useEffect} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'
import {createDrawerNavigator, DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import Home from './Home';
import ProfilePage from './ProfilePage';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'
import { useSelector,useDispatch } from 'react-redux';
import { getUser,logout } from '../redux/userSlice';

const Drawer= createDrawerNavigator();
const CustomDrawer = (props, {navigation})=>{
    const dispatch = useDispatch();
    const {fullname} = useSelector(state=>state.user.userInfo)
    useEffect(()=>{
     
      dispatch(getUser()) 
      
    })
    const handleLogout = () =>{
      dispatch(logout())
        props.navigation.navigate("Login")
    }
  return(
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props}>
   <View style={[tw`flex flex-row justify-between mb-5 bg-gray-100 `]}>
    <View style={[tw`flex-row justify-center`]}>
    <Image source={require('../assets/logo2.png')} style={{height:90,width:90}}/>
        <Text style={[tw`pt-8 pb-5  text-center`]}>Welcome, {fullname}</Text>
        
    </View>
 
     
    <Icon
        name='close-outline'
        type='ionicon'
        color='#517fa4'
        
        onPress={props.navigation.closeDrawer}
      />
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
    useLegacyImplementation={true}
    defaultStatus="closed"
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



