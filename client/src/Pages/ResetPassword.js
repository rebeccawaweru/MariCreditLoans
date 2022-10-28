import { useEffect } from 'react';
import {Header,Input,Button, AuthWrapper} from '../Components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector} from 'react-redux';
import { reset, resetpassword } from '../redux/userSlice';
import {Toast} from '../Components'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {TfiEmail} from 'react-icons/tfi'
const validationSchema = Yup.object({
    email:Yup.string().email('Invalid Email').required('Email field is required')
})
export default function ResetPassword(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {pending,msg} = useSelector(state=>state.user);
    const handleReset =(values)=>{
    dispatch(resetpassword({...values}))
   }
    useEffect(()=>{
        if(msg.success){
            toast.success(msg.message)
            setTimeout(()=>{
                navigate('/confirmpassword')
            },3000)
        }
        if(msg === 'Request failed with status code 404'){
            toast.error('Email does not exists')
        }else if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
            toast.error('Please check your internet connection and try again') 
        }   
       dispatch(reset())
    },[dispatch,msg,pending,navigate])
    return(
     <AuthWrapper>
     <Toast/>
    <Header 
    heading='Reset Password'
    paragraph='Enter your email to receive reset OTP'
    linkName='Login'
    linkUrl='/'/>
    <Formik
    initialValues={{
    email:''}}
    validationSchema={validationSchema}
    onSubmit={handleReset}>
    {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit})=>{
    const {email} = values;
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
    icon={<TfiEmail/>}/>
    <Button disabled={pending} title='Submit' onClick={handleSubmit}/>
    </>
    )}}
    </Formik>
     </AuthWrapper>
    )
}