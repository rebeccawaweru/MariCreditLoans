import { Button, ScrollView,Text, View } from "react-native"
import { Divider,Center } from "native-base";
import tw from "tailwind-react-native-classnames";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import Swal from "sweetalert2";
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
    const {email,phonenumber,fullname} = useSelector(state=>state.user.userInfo);
    useEffect(()=>{
      dispatch(getUser()).then(()=>{
        client.post('/myloans/'+email).then((response)=>{
            setLoan(response.data.loan[0])
            AsyncStorage.setItem('payment', response.data.loan[0]._id);
             console.log(response.data.loan)
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
            Swal.fire(
                "ERROR",
                "Proccess Timeout. You took too long to pay",
                "error"
            );
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
                            console.log(response)
                            if(response.payload.success){
                                setLoading(false);
                                Swal.fire(
                                    "SUCCESS!",
                                    "We received your loan payment",
                                    "success"
                                  );
                                setTimeout(()=>{
                                    navigation.navigate('HomeScreen')
                                },3000)
                            }
                        })
                     }
                 
                })
            
              }else if(response.data.ResultCode === 1032){
                  Swal.fire(
                    'ERROR',
                    'Request was cancelled by user',
                    'error'
                  )
              } else if (response.errorCode === "500.001.1001") {
                Swal.fire(
                    'ERROR',
                    'Wrong pin entered',
                    'error'
                  )
              } else {
                clearInterval(timer);
                setLoading(false);
                setError(true);
                setErrorMsg(response.data.ResultDesc);
                Swal.fire(
                    'ERROR',
                    'An error occurred.Please try again',
                    'error'
                  )
                // console.log(response);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        }, 2000);
      }
      const handleSubmit = async ()=>{
        console.log(loan.product,loan.amount, loan.loanID)
        if(loan.initiation === '-'){
            Swal.fire(
                'Error',
                'Your cannot pay for a pending/rejected loan',
                'error'
            )
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
            Swal.fire(
                'ERROR',
                'An error occurred.Please try again',
                'error'
              )
              console.log(err)
         })
        }
    };
    return(
       <ScrollView>

        <FormContainer>
            <FormInput
          value={amount}
          onChangeText={value => handleOnChangeText(value,'amount')}
            label='Amount'
            placeholder="Enter amount"/>
            <Button onPress={handleSubmit} title="Initiate Payment"/>
        </FormContainer>

        <Center ><Text>OR</Text></Center>
         <View style={[tw`p-4`]}>
        <Text>1.Open your sim tool kit</Text>
        <Text>2.Select Lipa na Mpesa-Paybill</Text>
        <Text>3.Enter Paybill Number:<b>4037355</b></Text>
        <Text>4.Enter Account Number:<b>{loan.loanID}</b></Text>
        <Text>5.Select OK</Text>
        </View>
        
       </ScrollView>
    )
}
export default NewPayment;