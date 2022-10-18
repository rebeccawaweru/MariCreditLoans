import { Button, Header,Input,Toast } from "../Components"
import { Formik } from "formik"
import * as Yup from 'yup'
import { useSelector,useDispatch } from "react-redux";
import { register } from "../actions/auth";
import { signup } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

    const handleSignup = async(values)=>{
       await dispatch(signup({...values}))
       .then((response)=>{
        if(response.payload.success){
            navigate('/')
         }else if(response.payload === 'Network Error' || response.payload === "Request failed with status code 500" ){
            toast.error('Please check your internet connection and try again') 
        }else if (response.payload === "Request failed with status code 401"){
           toast.error('Email  already exists') 
           }
       })
      
    }
    return(
   <>
   <Toast/>
   <Header
         heading="Create an account"
         paragraph="Already have an account? "
         linkName="Login"
         linkUrl="/"
   />
   <Formik 
   onSubmit={handleSignup}
   validationSchema={validationSchema}
   initialValues={{
    fullname:'',
    email:'',
    phonenumber:0,
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
    const {fullname,email,phonenumber,password,confirmpassword}= values;
    return(
    <>
    <Input 
    placeholder="Full Name"
    name='fullname'
    value={fullname}
    handleChange={handleChange('fullname')}
    onBlur={handleBlur('fullname')}
    error={touched.fullname && errors.fullname}/>
    <Input 
    placeholder="Email"
    name='email'
    value={email}
    handleChange={handleChange('email')}
    onBlur={handleBlur('email')}
    error={touched.email && errors.email}/>
    <Input placeholder="Phone Number"
    name='phonenumber'
    value={phonenumber}
    handleChange={handleChange('phonenumber')}
    onBlur={handleBlur('phonenumber')}
    error={touched.phonenumber && errors.phonenumber}/>
    <Input
    placeholder="Password"
    name='password'
    value={password}
    handleChange={handleChange('password')}
    onBlur={handleBlur('password')}
    error={touched.password && errors.password}/>
    <Input
    placeholder="Confirm Password"
    name='confirmpassword'
    value={confirmpassword}
    handleChange={handleChange('confirmpassword')}
    onBlur={handleBlur('confirmpassword')}
    error={touched.confirmpassword && errors.confirmpassword}/>
    <Button onClick={handleSubmit} title="Signup"/>
    </>
    )}}
   </Formik>
   </>
    )
}


