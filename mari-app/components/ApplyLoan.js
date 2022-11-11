import React, { useState, useEffect } from 'react';
import {View,StyleSheet,Dimensions,Text,TextInput, KeyboardAvoidingView,Platform,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import client from '../api/client'
import { ScrollView } from 'react-native-gesture-handler';
const ApplyLoan = ({navigation})=>{
const id = localStorage.getItem('id')
const [products,setProducts] = useState([]);
useEffect(()=>{
    client.get("/products")
       .then((response)=>{
           setProducts(response.data.products)
       })
     .catch((error)=>{
         console.log(error)
     });
 },[])
const [loan,setLoan] = useState({
    idnumber:0,
    amount:0,
    finalAmount:0,
    period:'',
    tenature:0,
    product:'',
    job:'',
    emergency1:0,
    emergency2:0,
})
const {idnumber, amount, period, tenature, product, job, emergency1, emergency2} = loan

const handleOnChangeText=(value,fieldName)=>{
    setLoan({...loan,[fieldName]:value})
}
const handleSubmit = async ()=>{
   try {
    const res = await client.get('/products/interest/'+product)
    var rate = res.data.product.interest
    const response = await client.get('/auth/'+id) 
    if(period === "months"){
       var interest =  amount *rate/100 *tenature/12;
    }else if(period === "weeks"){
        var interest = amount *rate/100 *tenature/52;
    }else if(period === "days"){
        var interest =  (amount *rate/100 *tenature/365)
    }else{
        var interest =  amount *rate/100 *tenature;
    }
    // console.log(interest);
    const phonenumber = response.data.user.phonenumber
    const fullname = response.data.user.fullname
    const finalAmount = interest + parseInt(amount)
    const loanresponse = await client.post('/loans', {
         fullname:fullname,
         phonenumber:phonenumber,
         idnumber:loan.idnumber,
         amount:loan.amount,
         rate: rate,
         interest:interest.toFixed(1),
         finalAmount:finalAmount.toFixed(1),
         period:period,
         tenature:tenature,
         product:product,
         job:loan.job,
         emergency1:loan.emergency1,
         emergency2:loan.emergency2
    })
    console.log(loanresponse.data.loan)
    if(res.data.frontavatar == "" || res.data.backavatar == "" ){
        navigation.navigate('IdScreen')
    }else{
        
        navigation.navigate('Dashboard')
    }
   } catch (error) {
       console.log(error.message)
   }
     
}
return(
    <>
    <FormContainer>
<View style={{flex:1 , backgroundColor:"#fff", padding:10}}>
    
<ScrollView>
      <Text style={{paddingTop:30}}>Fill in the required information.</Text>
      <Text style={{fontWeight:"bold", paddingTop:5}}>Choose loan product</Text>
      <View style={styles.container}>
      <Picker
        selectedValue={product}
        style={{ height: 50, width: 200,flex:1 }}
        onValueChange={(value, itemIndex) => handleOnChangeText(value,'product')}
      >
       {products.map((item,key)=>{
        return <Picker.Item key={key} value={item.name} label={item.name} />
       })}
      </Picker>
      </View>
     
<FormInput
label='ID number'
value={idnumber}
onChangeText={value => handleOnChangeText(value,'idnumber')}/>
<FormInput
label='Amount'
value={amount}
onChangeText={value => handleOnChangeText(value,'amount')}
/>
<Text>Loan Duration</Text>
<FormInput
label='Tenature'
value={tenature}
onChangeText={value => handleOnChangeText(value,'tenature')}
/>
<Text style={{fontWeight:"bold"}}>Period e.g months</Text>
<View style={styles.container}>
      <Picker
        selectedValue={period}
        style={{ height: 50, width: 200,flex:1 }}
        onValueChange={(value, itemIndex) => handleOnChangeText(value, 'period')}
      >
       <Picker.Item label="" value="" />
        <Picker.Item label="years" value="years" />
        <Picker.Item label="months" value="months" />
        <Picker.Item label="weeks" value="weeks" />
        <Picker.Item label="days" value="days" />
      </Picker>
    </View>
<FormInput
label='Job'
value={job}
onChangeText={value => handleOnChangeText(value,'job')}/>
<FormInput
label='Emergency 1'
value={emergency1}
onChangeText={value => handleOnChangeText(value,'emergency1')}/>
<FormInput
label='Emergency 2'
value={emergency2}
onChangeText={value => handleOnChangeText(value,'emergency2')}/>
<FormSubmitButton title='Submit' onPress={handleSubmit} />
</ScrollView>
</View>
</FormContainer>
</>
)
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingTop:10
    },
    key:{
        width:Dimensions.get('window').width,
   
    }
  });
export default ApplyLoan