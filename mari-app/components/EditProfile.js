import React, { useEffect,useState } from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,ImageBackground} from 'react-native'
import client from '../api/client'
import FormSubmitButton from './FormSubmitButton';
import FormInput from './FormInput';
import {Formik} from 'formik'
import * as  Yup from 'yup'

const regx = /^\d{10}$/;
const validationSchema = Yup.object({
    fullname2 : Yup.string().trim().min(5,'invalid name!'),
    email2: Yup.string().email('Invalid email!'),
    phonenumber2:Yup.string().matches(regx,'Invalid phonenumber'),
    emergency3:Yup.string().matches(regx,'Invalid phonenumber'),
    emergency4:Yup.string().matches(regx,'Invalid phonenumber')
    })
const EditProfile = ({navigation}) => {
    const id = localStorage.getItem('id')
    const [fullname, setfullName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [idnumber,setIdnumber] = useState('');
    const [emergency1,setEmergency1]= useState(0)
    const [emergency2,setEmergency2]= useState(0)
    const [avatar, setAvatar] = useState('')
    const [user, setUser] = useState([])
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
  };

    useEffect(()=>{
        client.get('/auth/'+id, {
          headers:headers,
        })
        .then((response)=>{
          console.log(response.data.user)
         setfullName(response.data.user.fullname);
         setIdnumber(response.data.user.idnumber)
         setEmergency1(response.data.emergency1)
         setEmergency2(response.data.emergency2)
         setAvatar(response.data.user.avatar)
         setEmail(response.data.user.email)
         setPhonenumber(response.data.user.phonenumber) 
      })
    },[])
    const userInfo = {
        fullname2:'',
        email2:'',
        phonenumber2:'',
        idnumber2:'',
        emergency3:'',
        emergency4:'',
    }
    const [profile, setProfile] = useState({
      fullname2:'',
        email2:'',
        phonenumber2:'',
        idnumber2:'',
        emergency3:'',
        emergency4:'',
    })
    const { fullname2,email2, phonenumber2,idnumber2,emergency3,emergency4,} = profile;
    
    const handleChange = (e)=>{
      const {name,value} = e.target
      setProfile({...profile,[name]:value})
    }
    const updateAll = async(values) =>{
         try {
        const res = await client.patch('/auth/'+id,{
             ...profile
        }) 
        if(res.data){
          console.log(res.data)
        }
         } catch (error) {
             console.log(error.message);
         }
    }
    return (
 <ImageBackground
        style={styles.container}
       source={require('../assets/bg1.jpg')}>
         <View style={{justifyContent:"center", alignItems:"center", marginTop:2,}}>
         
         <Formik 
    initialValues={userInfo} 
    validationSchema={validationSchema} 
    onSubmit={updateAll}>
  {(
    {values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit})=>{
     const{fullname2,email2,phonenumber2,idnumber2,emergency3,emergency4}= values
     return (
          <>
         <TouchableOpacity style={{paddingTop:5}}>
         <Image source={avatar} style={{width:100, height:100, borderRadius:"50%"}}/>
         </TouchableOpacity>
         <View style={{paddingTop:2, display:"flex"}}>
          <FormInput
            value={fullname2}
           error={touched.fullname2 && errors.fullname2}
           onChangeText={handleChange('fullname2')}
           onBlur={handleBlur('fullname2')}
           label='Full Name'
          placeholder={fullname}/>
         </View>
         <View style={{paddingTop:2, display:"flex"}}>
         <FormInput
          value={email2}
          error={touched.email2 && errors.email2}
          onChangeText={handleChange('email2')}
          onBlur={handleBlur('email2')}
          label='Email'
         placeholder={email}/>
         </View>
         <View style={{paddingTop:2}}>
           <FormInput
         value={phonenumber2}
         error={touched.phonenumber2 && errors.phonenumber2}
         onChangeText={handleChange('phonenumber2')}
         onBlur={handleBlur('phonenumber2')}
         label='Phone Number'
          placeholder={phonenumber}/>
         </View>
         <View style={{paddingTop:2}}>
         <FormInput
          value={idnumber2}
          error={touched.idnumber2 && errors.idnumber2}
          onChangeText={handleChange('idnumber2')}
          onBlur={handleBlur('idnumber2')}
          label='ID Number'
         placeholder={idnumber}/>
         </View>
         <View style={{paddingTop:2}}>
         <FormInput
          value={emergency3}
          error={touched.emergency3 && errors.emergency3}
          onChangeText={handleChange('emergency3')}
          onBlur={handleBlur('emergency3')}
          label='Emergency Contact 1:'
         placeholder={emergency1}/>
         </View>
         <View style={{paddingTop:2}}>
         <FormInput
         value={emergency4}
         error={touched.emergency4 && errors.emergency4}
         onChangeText={handleChange('emergency4')}
         onBlur={handleBlur('emergency4')}
         label='Emergency Contact 2:'
        placeholder={emergency2}/>
         </View>
         <View style={{paddingTop:2}}>
         </View>
         <FormSubmitButton
         onPress={handleSubmit} 
         width="90%"
         title='Update'/>

</>
  
    )}}
</Formik>

         </View>
         </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,  
        height:"110%",
    }
})

export default EditProfile;