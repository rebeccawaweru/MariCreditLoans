import { Header,Input,Button,Toast} from "../Components";
import { useSelector,useDispatch } from "react-redux";
import { confirmpassword,newpassword} from "../redux/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from 'yup';
const validationSchema = Yup.object({
    password:Yup.string().trim().min(6,'Password must be contain 6 or more characters').required('Password is required'),
    confirmpassword:Yup.string().equals([Yup.ref('password'),null], 'Passwords do not match!').required('Kindly confirm password')
})
export default function ConfrimPassword(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirm,setConfirm] = useState(false);
    const {otp,setOtp} = useState(0);
    const {pending,userInfo,msg} = useSelector(state=>state.user);
    const handleConfirm =async()=>{
    await dispatch(confirmpassword(otp)).then((response)=>{
        if(response.payload.success){
        setConfirm(true);
        }
    })}
    const handleNewPassword=async(values)=>{
    await dispatch(newpassword({...values})).then((response)=>{
        if(response.payload.success){
        toast.success('Password set');
        setTimeout(()=>{
            navigate('/')
        },3000)}

    })}
    useEffect(()=>{
        if(msg === 'Request failed with status code 404'){
            toast.error('Invalid Code')
        }else if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
            toast.error('Please check your internet connection and try again') 
        }
    },[dispatch,msg,navigate,pending,userInfo])
    return(
    <>
   {confirm ? 
   <>
   <Toast/>
   <Header
    paragraph='Enter new password'/>
  <Formik
    onSubmit={handleNewPassword}
    validationSchema={validationSchema}
    initialValues={{
    password:'',
    confirmpassword:''
  }}>
    {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit 
    })=>{
    const {password,confirmpassword} = values;
    return(
    <>
   <Input
   type='password'
   placeholder='Password'
   name='password'
   value={password}
   handleChange={handleChange('password')}
   error={touched.password && errors.password}
   onBlur={handleBlur('password')}
   />
   <Input
   type='password'
   placeholder='Confirm Password'
   name='confirmpassword'
   value={confirmpassword}
   handleChange={handleChange('confirmpassword')}
   error={touched.confirmpassword && errors.confirmpassword}
   onBlur={handleBlur('confirmpassword')}
   />
   <Button disabled={pending} onClick={handleSubmit} title='Submit'/>
    </> )
 }}
  
  </Formik>
   </> : 
   <>
    <Header
    paragraph='Enter the 6-digit code sent to your email'/>
   <Input
   value={otp}
   handleChange={(e)=>setOtp(e.target.value)}
   />
   <Button disabled={pending} onClick={handleConfirm} title='Submit'/> 
   </> }  
  </>
    )
}