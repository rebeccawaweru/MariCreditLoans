import React,{useEffect} from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import {useDispatch} from 'react-redux';
import { signup } from '../redux/userSlice';
import Swal from "sweetalert2";

const regx = /^\d{10}$/;
const validationSchema = Yup.object({
fullname : Yup.string().trim().min(5,'invalid name!').required('Full name is required'),
email: Yup.string().email('Invalid email!').required('Email  is required'),
phonenumber:Yup.string().matches(regx,'Invalid phonenumber').required('Phone number is required'),
password:Yup.string().trim().min(6,'password must have 6 or more characters').required('Password is required'),
confirmPassword:Yup.string().equals([Yup.ref('password'),null],'Passwords do not match!')
})
const SignupForm = ({navigation})=> {

  const dispatch = useDispatch();
  const userInfo = {
    fullname:'',
    email:'',
    phonenumber:0,
    password:'',
    confirmPassword:''
}

const signUp = async(values,formikActions)=>{
  try {
    await dispatch(signup({...values})).then((res)=>{
      if(res.payload.success){
        Swal.fire({
          title: "Success",
          text: "Signup successful",
          icon: "success",
          confirmButtonText: "OK",
        });
      } 
    })
  
  } catch (error) {
    console.log(error)
  }
   
  formikActions.resetForm()
  formikActions.setSubmitting(false)
}

  return (
<FormContainer>

<Formik 
    initialValues={userInfo} 
    validationSchema={validationSchema} 
    onSubmit={signUp}>
  {(
    {values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit})=>{
     const{fullname,email,phonenumber,password,confirmPassword}= values
     return (
          <>
          <FormInput
          value={fullname}
          error={touched.fullname && errors.fullname}
          onChangeText={handleChange('fullname')}
          onBlur={handleBlur('fullname')}
          label='Full Name'
          placeholder='John Smith'
          autoCapitalize="none" />
        
          <FormInput
            autoCapitalize="none"
            label="Email"
            value={email}
            error={touched.email && errors.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            placeholder="example@gmail.com" />
            
            <FormInput
            label="Phone Number"
            keyboardType="numeric"
            value={phonenumber.toString()}
            error={touched.phonenumber && errors.phonenumber}
            onChangeText={handleChange('phonenumber')}
            onBlur={handleBlur('phonenumber')}
            placeholder="enter phone number"/>
            
            <FormInput
            autoCapitalize="none"
            secureTextEntry
            label="Password"
            value={password}
            error={touched.password && errors.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="*******"/>

            <FormInput autoCapitalize="none"
              secureTextEntry
              label="Confirm Password"
              title="password"
              placeholder="********"
              value={confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              />

              <FormSubmitButton 
              submitting={isSubmitting}
              onPress={handleSubmit} title='Signup' /></>
  
    )}}
</Formik>
  </FormContainer>
    );
}
export default SignupForm;