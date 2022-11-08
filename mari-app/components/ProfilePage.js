import React, { useEffect,useState } from 'react';
import { View, StyleSheet,Image, TouchableOpacity, Text,Button} from 'react-native';
import client from '../api/client'
import FormSubmitButton from './FormSubmitButton';
const ProfilePage = ({navigation})=> {
    const id = localStorage.getItem('id')
    const [error, setError] = useState(false)
    const [fullname, setfullName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState(0)
    const [idnumber, setIdnumber] = useState(0)
    const [emergency1, setEmergency1] = useState(0)
    const [emergency2, setEmergency2] = useState(0) 
    const [avatar, setAvatar] = useState('')
    useEffect(()=>{
        client.get('/auth/'+id)
        .then((response)=>{
         setfullName(response.data.user.fullname);
         setPhonenumber(response.data.user.phonenumber) ;
         setAvatar(response.data.user.avatar)
         setEmail(response.data.user.email)
         setIdnumber(response.data.user.idnumber)
         setEmergency1(response.data.user.emergency1)
         setEmergency2(response.data.user.emergency2)
         console.log(idnumber)
         if(idnumber === 0 || emergency1 === 0 || emergency2 === 0 ){
             setError(true)
         }
      })
    .catch((error)=>{
        console.log(error)
    });
    },[])
    return (
        <View style={styles.container}>
         <View style={{justifyContent:"center", alignItems:"center", marginTop:70}}>
         {error && <Text style={{color:"red"}}>Kindly update your personal details</Text>}
         <TouchableOpacity style={{paddingTop:20}}>
         <Image source={avatar} style={{width:250, height:250, borderRadius:"50%"}}/>
         </TouchableOpacity>
         <View style={{paddingTop:20}}>
         <Text>Full Name: {fullname}</Text>
         </View>
         <View style={{paddingTop:20}}>
         <Text>Email: {email}</Text>
         </View>
         <View style={{paddingTop:20}}>
         <Text>Phone: {phonenumber}</Text>
         </View>
         <View style={{paddingTop:20}}>
         <Text>ID:</Text>
         </View>
         <View style={{paddingTop:20}}>
         <Text>Emergency Contact 1 </Text>
         </View>
         <View style={{paddingTop:20}}>
         <Text>Emergency Contact 2 </Text>
         </View>
         <View style={{paddingTop:20}}>
         </View>
         <FormSubmitButton
         onPress={()=>navigation.navigate('EditProfile')} 
         width="90%"
         title='Edit'/>
         </View>
     
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,  
    }
})

export default ProfilePage;