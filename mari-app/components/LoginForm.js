import React, { useEffect } from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import {useDispatch,useSelector} from 'react-redux';
import { updateUser2,reset } from '../redux/userSlice';
import { ScrollView,Alert,Text,View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email!').required('Email  is required'),
  password:Yup.string().trim().min(6,'password must have 6 or more characters').required('Password is required')
})
const LoginForm = ({navigation})=> {
const dispatch = useDispatch();
const {msg,isLoggedin} = useSelector(state=>state.user);
const userInfo = {
  email:'',
  password:''
}
const login = async(values,formikActions)=>{
  await dispatch(updateUser2({...values}));
  formikActions.resetForm()
  formikActions.setSubmitting(false)
}
useEffect(()=>{
  if(isLoggedin){
    navigation.navigate("HomeScreen")
 }
  if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
    Alert.alert('Error','Please check your internet connection and try again') 
    setTimeout(()=>{
      dispatch(reset())
    },3000)
    
     }else if (msg === "Request failed with status code 401"){
    Alert.alert('Error','Incorrect credentials') 
    setTimeout(()=>{
      dispatch(reset())
    },3000)
 }

},[msg,isLoggedin,dispatch])
    return (
      <ScrollView>
      <FormContainer>
       <Formik
         initialValues={userInfo} 
         validationSchema={validationSchema} 
         onSubmit={login}>
       {({
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit})=>{
        const{email,password}= values
        return (
          <ScrollView>
      <FormInput
      autoCapitalize="none" 
      label="Email"
      value={email} 
      error={touched.email && errors.email}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      placeholder="example@gmail.com"/>

      <FormInput 
      autoCapitalize="none" 
     type='password'
      label="Password" 
      value={password} 
      error={touched.password && errors.password}
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      placeholder="******" />

      <FormSubmitButton 
      submitting={isSubmitting}
      onPress={handleSubmit} 
      title='Login'/>
    
      <Text style={[tw`font-bold text-blue-500 mt-2 text-right`]} onPress={()=>navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
    
    
         </ScrollView>
         )}}
       </Formik>
    </FormContainer>
    </ScrollView>
    );
}


export default LoginForm;