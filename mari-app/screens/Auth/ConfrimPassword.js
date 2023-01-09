import React, { useEffect,useState } from 'react';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/FormInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import {useDispatch,useSelector} from 'react-redux';
import { confirmpassword,newpassword,reset} from "../../redux/userSlice";
import { ScrollView,Alert,ImageBackground,Text,Image,View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
const validationSchema = Yup.object({
    password:Yup.string().trim().min(6,'Password must be contain 6 or more characters').required('Password is required'),
    confirmpassword:Yup.string().equals([Yup.ref('password'),null], 'Passwords do not match!').required('Kindly confirm password')
})
const ConfirmPassword = ({navigation})=> {
const dispatch = useDispatch();
const [confirm,setConfirm] = useState(false);
const [code,setCode] = useState({
    otp:0
});
const {otp} = code;
const handleChangeText = (value,fieldName)=>{
    setCode({...code,[fieldName]:value})
}
const {pending,msg} = useSelector(state=>state.user);
const handleConfirm =async()=>{
    await dispatch(confirmpassword({otp})).then((response)=>{
        if(response.payload.success){
        setConfirm(true);
        }
    })}
const resetPassword = async(values)=>{
    await dispatch(newpassword({...values})).then((response)=>{
        if(response.payload.success){
        Alert.alert('Success','Password set');
        setTimeout(()=>{
            navigation.navigate('Login')
        },3000)
    }else{
        console.log(response.payload)
    }

    })}
useEffect(()=>{
if(msg === 'Request failed with status code 404'){
    Alert.alert('Error','Invalid Code')
}else if(msg === 'Network Error' || msg === "Request failed with status code 500" ){
    Alert.alert('Error','Please check your internet connection and try again') 
}
dispatch(reset());
},[dispatch,msg,pending]);
    return (
    <ImageBackground
    style={[tw `flex-1 `]}
    source={require('../../assets/b4.jpg')}
    >
     <View style={{flex:1, paddingTop:50}}>
      <Image source={require('../../assets/logo2.png')} style={{height:160,width:250,alignSelf:'center'}}/>
      <FormContainer>
     {confirm ?
       <Formik
       initialValues={{
        password:'',
        confirmpassword:''
      }}
         validationSchema={validationSchema} 
         onSubmit={resetPassword}>
       {({
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit})=>{
        const {password,confirmpassword} = values;
        return (
          <ScrollView>
           
            <Text style={[tw`text-center font-bold mt-3`]}>Enter your new password</Text>
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
              value={confirmpassword}
              error={touched.confirmpassword && errors.confirmpassword}
              onChangeText={handleChange('confirmpassword')}
              onBlur={handleBlur('confirmpassword')}
              />
      <FormSubmitButton 
      submitting={isSubmitting}
      onPress={handleSubmit} 
      title='Reset Password'/>
         </ScrollView>
         )}}
       </Formik>
      :
      <>
      <Text style={[tw`text-center font-bold`]}>Enter the 6-digit code sent on sms</Text>
      <FormInput 
         label=''
         placeholder='XXXXXX'
         value={otp}
         onChangeText={value => handleChangeText(value,'otp')}
    />
<FormSubmitButton
      onPress={handleConfirm} 
      title='Submit'/>
      </> }
    </FormContainer>
    </View>
    </ImageBackground>
    );
}


export default ConfirmPassword;