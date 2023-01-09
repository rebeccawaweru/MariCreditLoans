import { AuthWrapper, Button, Header,Input,Toast } from "../Components"
import { Formik } from "formik"
import * as Yup from 'yup'
import { useSelector,useDispatch } from "react-redux";
import { signup } from "../redux/userSlice";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {FcLock,FcPhone} from 'react-icons/fc'
import {TfiEmail} from 'react-icons/tfi'
import {MdOutlinePersonPin} from 'react-icons/md'
const regx = /^\d{10}$/;
const validationSchema = Yup.object({
    fullname:Yup.string().required('Full name is required'),
    email:Yup.string().email('Invalid email').required('Email is required'),
    phonenumber:Yup.string().matches(regx, 'Invalid Phonenumber').required('Phone number is required'),
    password:Yup.string().trim().min(6, 'password must contain 6 or more characters').required('Password is required'),
    confirmpassword:Yup.string().equals([Yup.ref('password'),null], 'Passwords do not match!').required('Kindly confirm password')
})
export default function Signup(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {msg,pending} = useSelector(state=>state.user);
    const handleSignup = async(values)=>{
       dispatch(signup({...values})).then((response)=>{
        if(response.payload.success){
          toast.success('Signup successfull')
            setTimeout(()=>{
              navigate('/login')
            },3000)
          
        }
       })   
    }
    useEffect(()=>{
    if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
        toast.error('Please check your internet connection and try again') 
        }else if (msg === "Request failed with status code 400"){
        toast.error('Email  already exists') 
    }
 
  },[msg,pending,dispatch,navigate])
   return(
   <AuthWrapper>
   <Toast/>
   <Header
    heading="Create an account"
    paragraph="Already have an account? "
    linkName="Login"
    linkUrl="/login"
   />
   <Formik 
   onSubmit={handleSignup}
   validationSchema={validationSchema}
   initialValues={{
    fullname:'',
    email:'',
    phonenumber:0,
    password:'',
    confirmpassword:'',
    usertype:'staff'
   }}>
  {({
     values,
     errors,
     touched,
     handleChange,
     handleBlur,
     handleSubmit 
  })=>{
    const {fullname,email,phonenumber,password,confirmpassword,usertype}= values;
    return(
    <>
      <div className="grid grid-cols-2 space-x-2">
      <Input 
    placeholder="Full Name"
    name='fullname'
    value={fullname}
    handleChange={handleChange('fullname')}
    onBlur={handleBlur('fullname')}
    error={touched.fullname && errors.fullname}
    icon={<MdOutlinePersonPin/>}/>
    <Input 
    placeholder="Email"
    name='email'
    value={email}
    handleChange={handleChange('email')}
    onBlur={handleBlur('email')}
    error={touched.email && errors.email}
    icon={<TfiEmail/>}
    />
      </div>
 
    <Input placeholder="Phone Number"
    name='phonenumber'
    value={phonenumber}
    handleChange={handleChange('phonenumber')}
    onBlur={handleBlur('phonenumber')}
    error={touched.phonenumber && errors.phonenumber}
    icon={<FcPhone/>}/>
    <Input
    placeholder="Password"
    name='password'
    value={password}
    handleChange={handleChange('password')}
    onBlur={handleBlur('password')}
    error={touched.password && errors.password}
    icon={<FcLock/>}/>
    <Input
    placeholder="Confirm Password"
    name='confirmpassword'
    value={confirmpassword}
    handleChange={handleChange('confirmpassword')}
    onBlur={handleBlur('confirmpassword')}
    icon={<FcLock/>}
    error={touched.confirmpassword && errors.confirmpassword}/>
    <Button disabled={pending} onClick={handleSubmit} title="Signup"/>
    </>
    )}}
   </Formik>
   </AuthWrapper>
    )
}


