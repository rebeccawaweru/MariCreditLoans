import React, { useEffect } from "react";
import { Header,Input,Button,Toast,AuthWrapper } from "../Components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { updateUser2,reset } from "../redux/userSlice";
import {Formik} from 'formik'
import * as  Yup from 'yup'
import {FcLock} from 'react-icons/fc'
import {TfiEmail} from 'react-icons/tfi'
export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {msg,pending,isLoggedin} = useSelector(state=>state.user);
    const validationSchema = Yup.object({
       email: Yup.string().email('Invalid Email').required('Email is required!'),
       password: Yup.string().trim().min(6,'password must have 6 or more characters').required('Password is required')
    })
    const handleLogin = (values)=>{
     dispatch(updateUser2 ({...values})) 
    }
    useEffect(()=>{
      if(isLoggedin){
         navigate('/dashboard')
      }
      if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
         toast.error('Please check your internet connection and try again') 
         }else if (msg === "Request failed with status code 401"){
         toast.error('Incorrect credentials') 
     }
     dispatch(reset())
    },[msg,isLoggedin,dispatch,navigate])
 
    return(
        <AuthWrapper props>
        <Toast/>
        <Header
           heading="Login to your account"
           paragraph="Don't have an account yet? "
           linkName="Signup"
           linkUrl="/signup"
        />
       <Formik
         initialValues={{
            email:'',
            password:''
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        >
       {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit})=>{
     const{email,password}= values
     return(
    <>
   <Input
        type='email'
        name="email" 
        error={touched.email && errors.email}
        onBlur={handleBlur('email')}
        value={email}
        handleChange={handleChange('email')}
        labelText="Email"
        placeholder="Email"
        icon={<TfiEmail/>}
        />
        <Input
        type='password'
        name='password'
        placeholder="Password"
        error={touched.password && errors.password}
        onBlur={handleBlur('password')}
        value={password}
        handleChange={handleChange('password')}
        icon={<FcLock/>}
        />
        <div className="text-sm float-right">
        <Link className="text-black-600 hover:text-purple-600 " to="/reset">Forgot Password?</Link>
        </div>
        <Button disabled={pending} onClick={handleSubmit} title="Login"/>
        </>
     )}}
        </Formik>
    
   </AuthWrapper>
    )
}