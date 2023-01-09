import { Button, ScrollView,Text, View,Alert } from "react-native"
import { Divider,Center} from "native-base";
import tw from "tailwind-react-native-classnames";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import { getLoans,updateLoan } from "../../redux/loanSlice";
import { newSms,confirmPayment } from "../../redux/paymentSlice";
import { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux'
import client from "../../api/client";
import { getUser } from "../../redux/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
const NewPayment = ({navigation})=>{
    const dispatch = useDispatch();
    const [loan,setLoan] = useState([])
    const [empty,setEmpty] = useState(true)
    const {email,phonenumber,fullname} = useSelector(state=>state.user.userInfo);
    useEffect(()=>{
      dispatch(getUser()).then(()=>{
        client.post('/myloans/'+email).then((response)=>{
            if(response.data.success){
              setLoan(response.data.loan[0])
              AsyncStorage.setItem('payment', response.data.loan[0]._id);
              setEmpty(false)
            }
         
        }).catch((err)=>{
          setEmpty(true)
         })
      });



      },[dispatch])
    const [data,setData] = useState({
        amount:'',
        mode:'',
        code:'',
    });
    const {amount,mode,code} = data;
    const handleOnChangeText = (value,fieldName)=>{

        setData({...data,[fieldName]:value});
    }
    const [reduced,setReduced]= useState(0)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
      //stkpushquery
      var reqcount = 0;
      const stkPushQuery = (checkOutRequestID) => {
        const timer = setInterval(() => {
          reqcount += 1;
          if (reqcount === 20) {
            clearInterval(timer);
            setLoading(false);
        
            alert('Proccess Timeout. You took too long to pay');
            // Swal.fire({
            //   title : "ERROR",
            //   html: <p>"Proccess Timeout. You took too long to pay"</p>,
            //   icon:  "error"
            // });
            return;
          }
          client
            .post("/stkpushquery", {
              CheckoutRequestID: checkOutRequestID,
            })
            .then((response) => {
              if (response.data.ResultCode === "0") {
                clearInterval(timer);
                //successfull payment
                const r = loan.balance - Number(amount);
                    const date = new Date().toISOString().slice(0, 10)
                    const days = new Date(date.replace(/-/g, "/")).getTime() - new Date(loan.initiation.replace(/-/g, "/")).getTime();
                    const newrate = 1/30*loan.rate/100;
                   const reducingBalance = ((r * newrate *days/(60 * 60 * 24 * 1000)) + r)
                   setReduced(reducingBalance);
                    dispatch(newSms({
                        phonenumber:loan.phonenumber,
                        message:`Your payment of Ksh${Math.round(amount).toLocaleString()} has been received. Your current balance is Ksh${Math.round(reducingBalance).toLocaleString()}`
                    }))
                dispatch(updateLoan({
                  balance:r
                })).then((response)=>{
                     if(response.payload.success){
                        dispatch(confirmPayment({
                           email:email,
                           fullname:fullname,
                           amount:amount,
                           balance:Math.round(reducingBalance).toLocaleString(), 
                        })).then((response)=>{
                          
                            if(response.payload.success){
                                setLoading(false);
                                // alert('Your loan payment has been received')
                                Alert.alert('Success', 'Your loan payment has been received')
                                // Swal.fire({
                                //   title:"SUCCESS!",
                                //   text:<Text>"We received your loan payment"</Text>,
                                //   icon: "success"
                                // }
                                  
                                //   );
                              
                                navigation.goBack();

                                    navigation.push('HomeScreen');
                             
                            }
                        })
                     }
                 
                })
            
              }else if(response.data.ResultCode === 1032){
                Alert.alert({
                  title:'Error',
                  message:'Request cancelled by user'
                 })
                // alert( 'Request cancelled by user')
                  // Swal.fire(
                  //   'ERROR',
                  //   'Request was cancelled by user',
                  //   'error'
                  // )
              } else if (response.errorCode === "500.001.1001") {
                alert('Wrong pin entered')
                // Swal.fire(
                //     'ERROR',
                //     'Wrong pin entered',
                //     'error'
                //   )
              } else {
                clearInterval(timer);
                setLoading(false);
                setError(true);
                setErrorMsg(response.data.ResultDesc);
                alert('An error occurred.Please try again')
                // Swal.fire(
                //     'ERROR',
                //     'An error occurred.Please try again',
                //     'error'
                //   )
                }
            })
            .catch((err) => {
              // console.log(err.message);
            });
        }, 2000);
      }
      const handleSubmit = async ()=>{
  
        if(!amount){
           alert('Amount is required')
        }else if(loan.initiation === '-'){
               alert( 'Your cannot pay for a pending/rejected loan');
            // Swal.fire(
            //     'Error',
            //     'Your cannot pay for a pending/rejected loan',
            //     'error'
            // )
        }else{
            await client.post('/mpesa',{
                loanid:loan._id,
                phonenumber:phonenumber.substring(1),
                product:loan.product,
                amount:Number(amount),
            }).then((response)=>{
                console.log(response)
                setLoading(true);
                stkPushQuery(response.data.CheckoutRequestID);
         }).catch((err)=>{
            alert( 'An error occurred.Please try again')
            // Alert.alert({
            //   title:'Error',
            //   message:'An error occurred.Please try again'
            //  })
            // Swal.fire(
            //     'ERROR',
            //     'An error occurred.Please try again',
            //     'error'
            //   )
              // console.log(err)
         })
        }
    };
    return(
       <ScrollView>
        <FormContainer>
          {!empty ?
          <>
             <FormInput
          value={amount}
          onChangeText={value => handleOnChangeText(value,'amount')}
          label='Amount'
          placeholder="Enter amount"/>
          <Button onPress={handleSubmit} title="Initiate Payment"/>
        <Center ><Text>OR</Text></Center>
         <View style={[tw`p-4`]}>
        <Text>1.Open your sim tool kit</Text>
        <Text>2.Select Lipa na Mpesa-Paybill</Text>
        <Text>3.Enter Paybill Number:4037355</Text>
        <Text style={[tw`font-bold`]}>4.Enter Account Number:{loan.loanID}</Text>
        <Text>5.Select OK</Text>
        </View>
          </> : 
             <View style={[tw`p-4`]}>
            <Text>Apply for loan to make payment</Text>
             </View>
             }
       
        </FormContainer>
       </ScrollView>
    )
}
export default NewPayment;