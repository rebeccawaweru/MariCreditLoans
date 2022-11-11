import React, { useState } from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import {useDispatch,useSelector} from 'react-redux';
import { updateUser2 } from '../redux/userSlice';
import { ScrollView } from 'react-native';
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email!').required('Email  is required'),
  password:Yup.string().trim().min(6,'password must have 6 or more characters').required('Password is required')
})
const LoginForm = ({navigation})=> {
const dispatch = useDispatch()
const userInfo = {
  email:'',
  password:''
}
const login = async(values,formikActions)=>{
  try {
  await dispatch(updateUser2({...values})).then((res)=>{
    if(res.payload){
      navigation.navigate("Dashboard")
    }
  })
  } catch (error) {
    console.log(error.message)
  }
  formikActions.resetForm()
  formikActions.setSubmitting(false)
}
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
          <>
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
      secureTextEntry
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
         </>
         )}}
       </Formik>
    </FormContainer>
    </ScrollView>
    );
}


export default LoginForm;