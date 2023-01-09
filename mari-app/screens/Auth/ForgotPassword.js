import React, { useEffect } from 'react';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/FormInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import FormHeader from '../../components/FormHeader';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch,useSelector} from 'react-redux';
import {reset, resetpassword } from '../../redux/userSlice';
import { ScrollView,Alert,ImageBackground ,Text,Image,View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import client from '../../api/client';
import axios from 'axios';
const regx = /^\d{10}$/;
const validationSchema = Yup.object({
  phonenumber:Yup.string().matches(regx,'Invalid phonenumber').required('Phone number is required'),
})
const ForgotPassword = ({navigation})=> {
const dispatch = useDispatch();
const {pending,msg} = useSelector(state=>state.user);
const userInfo = {
  phonenumber:0
}
const sentOtp = async(values,formikActions)=>{
  console.log(values.phonenumber.substring(1))
   await client.post('/resetpassword',{
    phonenumber:values.phonenumber.substring(1)
   }).then((response)=>{
      console.log(response)
     
    if(response.data.success){
        Alert.alert('Success', 'OTP sms sent');
      
        setTimeout(()=>{
            navigation.navigate('ConfirmPassword')
        },3000)

       }
    }).catch((err)=>console.log(err.message))

  formikActions.resetForm()
  formikActions.setSubmitting(false)
}
useEffect(()=>{
  
    if(msg === 'Request failed with status code 404'){
        Alert.alert('Error','Phone Number does not exists')
    }else if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
        Alert.alert('Error','Please check your internet connection and try again') 
    }   
   dispatch(reset())
},[dispatch,msg,pending])
    return (
    <ImageBackground
        style={[tw `flex-1 `]}
         source={require('../../assets/b4.jpg')}
         >
    <View style={{flex:1, paddingTop:50}}>
         <Image source={require('../../assets/logo2.png')} style={{height:160,width:250,alignSelf:'center'}}/>
          
      <FormContainer>
       <Formik
         initialValues={userInfo} 
         validationSchema={validationSchema} 
         onSubmit={sentOtp}>
       {({
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit})=>{
        const{phonenumber}= values;
        return (
          <ScrollView>
            <Text style={[tw`font-bold text-center mt-3`]}>Enter phonenumber to reset your password</Text>
      <FormInput
      autoCapitalize="none" 
      label=""
      value={phonenumber} 
      error={touched.phonenumber && errors.phonenumber}
      onChangeText={handleChange('phonenumber')}
      onBlur={handleBlur('phonenumber')}
      placeholder="07xxxxxxxx"/>
      <FormSubmitButton 
      submitting={isSubmitting}
      onPress={handleSubmit} 
      title='Send OTP'/>
         </ScrollView>
         )}}
       </Formik>
    </FormContainer>
    </View>
    </ImageBackground>
    );
}


export default ForgotPassword;