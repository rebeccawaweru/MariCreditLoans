import React,{useEffect} from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import {useDispatch,useSelector} from 'react-redux';
import { signup,reset } from '../redux/userSlice';
import { KeyboardAvoidingView,Alert } from 'react-native';
const regx = /^\d{10}$/;
const validationSchema = Yup.object({
fullname : Yup.string().trim().min(5,'invalid name!').required('Full name is required'),
email: Yup.string().email('Invalid email!').required('Email  is required'),
phonenumber:Yup.string().matches(regx,'Invalid phonenumber').required('Phone number is required'),
password:Yup.string().trim().min(6,'password must have 6 or more characters').required('Password is required'),
confirmPassword:Yup.string().equals([Yup.ref('password'),null],'Passwords do not match!')
})
const SignupForm = ({navigation})=> {
  const {msg,pending} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const userInfo = {
    fullname:'',
    email:'',
    phonenumber:0,
    password:'',
    confirmPassword:''
}

const signUp = async(values,formikActions)=>{

    await dispatch(signup({...values})).then((res)=>{
      if(res.payload.success){
        Alert.alert('Success','Signup successful' )
        navigation.navigate("HomeScreen");

      }
    })
  formikActions.resetForm()
  formikActions.setSubmitting(false)
}
useEffect(()=>{
  if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
      Alert.alert('Error','Please check your internet connection and try again') 
       setTimeout(()=>{
      dispatch(reset())
    },3000)
      }else if (msg === "Request failed with status code 400"){
      Alert.alert('Error','Email  already exists') 
      setTimeout(()=>{
        dispatch(reset())
      },3000)
  }

},[msg,pending,dispatch,])

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
          <KeyboardAvoidingView>
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
           
            label="Password"
            value={password}
            error={touched.password && errors.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="*******"/>

            <FormInput autoCapitalize="none"
              
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
              onPress={handleSubmit} title='Signup' />
              </KeyboardAvoidingView>
  
    )}}
</Formik>
  </FormContainer>
    );
}
export default SignupForm;