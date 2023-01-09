import {DashboardWrapper,Input, Toast,CustomLoading} from "../../Components";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {GiPayMoney,GiZBrick} from 'react-icons/gi'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateLoan,getLoan } from "../../redux/loanSlice";
import client from "../../api/client";
import Swal from "sweetalert2";
import { mpesa,bank } from "../../assets";
import { confirmPayment,newSms,newPayment } from "../../redux/paymentSlice";
export default function NewPayment(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [method,setMethod] = useState(false);
    const [reduced,setReduced] = useState(0)
    const id = localStorage.getItem('loan')
    const email2 = useSelector(state=>state.user.userInfo.email)
    const {fullname,idnumber,phonenumber,product,_id,balance,email,initiation,rate} = useSelector(state=>state.loan.loanInfo);
  
    const date = new Date().toISOString().slice(0, 10)
    const days = new Date(date.replace(/-/g, "/")).getTime() - new Date(initiation.replace(/-/g, "/")).getTime();
    const currentreducingbalance = ((balance * (1/30*rate/100) * days/(60 * 60 * 24 * 1000)) +balance) ;
   
    const [data,setData] = useState({
        amount:'',
        mode:'',
        code:'',
    });
    const {amount,mode,code} = data;
    const onChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})

    }
   
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   
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
            const r = balance - Number(amount);
                const newrate = 1/30*rate/100;
               const reducingBalance = ((r * newrate *days/(60 * 60 * 24 * 1000)) + r)
               setReduced(reducingBalance);
               if(Number(amount) >= currentreducingbalance){
                const b = Number(amount)-currentreducingbalance;
                dispatch(newSms({
                  phonenumber:phonenumber,
                  message:`Your loan has been cleared successfully.Your account balance
                  is Ksh. ${b}. Thank you for choosing MariCredit.`
                }))
                dispatch(updateLoan({
                  accountbalance:b,
                  balance:r,
                  active:true
                })).then((response)=>{
                     if(response.payload.success){
                        dispatch(confirmPayment({
                           email:email,
                           fullname:fullname,
                           amount:amount,
                           balance:Math.round(b).toLocaleString(), 
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
                                    navigate('/viewpayment/'+id)
                                },3000)
                            }
                        })
                     }
                 
                })

              }else{

                dispatch(newSms({
                  phonenumber:phonenumber,
                  message:`Your payment of Ksh${Math.round(amount).toLocaleString()} has been received. Your loan balance is Ksh${Math.round(reducingBalance).toLocaleString()}`
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
                                  navigate('/viewpayment/'+id)
                              },3000)
                          }
                      })
                   }
               
              })

              }
               
         
        
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
      
        if(initiation === '-'){
            Swal.fire(
                'Error',
                'Your cannot pay for a pending/rejected loan',
                'error'
            )
        }else{
            await client.post('/mpesa',{
                loanid:_id,
                name:fullname,
                idnumber:idnumber,
                phonenumber:phonenumber,
                product:product,
                amount:Number(amount),
                reducingbalance:Number(reduced),
                mode:mode,
                addedBy:email2
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
              console.log(err.message)
         })
        }
    };
    const handleBankSubmit = ()=>{
      if(initiation === '-'){
        Swal.fire(
            'Error',
            'Your cannot pay for a pending/rejected loan',
            'error'
        )
        }
      const r = balance - Number(amount);
      const date = new Date().toISOString().slice(0, 10)
      const days = new Date(date.replace(/-/g, "/")).getTime() - new Date(initiation.replace(/-/g, "/")).getTime();
      const newrate = 1/30*rate/100;
     const reducingBalance = ((r * newrate *days/(60 * 60 * 24 * 1000)) + r)
      if(Number(amount) >= currentreducingbalance){
             const b = Number(amount) - currentreducingbalance;
          
                dispatch(newSms({
                  phonenumber:phonenumber,
                  message:`Your loan has been cleared successfully.Your account balance is Ksh. ${b}. Thank you for choosing MariCredit.`
                }))
                dispatch(updateLoan({
                  accountbalance:b,
                  balance:r,
                  active:true
                })).then((response)=>{
                     if(response.payload.success){
                        dispatch(confirmPayment({
                           email:email,
                           fullname:fullname,
                           amount:amount,
                           balance:Math.round(Number(amount) - currentreducingbalance).toLocaleString(), 
                        })).then((response)=>{
                            console.log(response)
                            if(response.payload.success){
                              dispatch(newPayment({
                                loanid:id,
                                name:fullname,
                                idnumber:idnumber,
                                phonenumber:phonenumber,
                                amount:amount,
                                reducingbalance:Number(reducingBalance),
                                transactioncode:code,
                                mode:mode,
                                product:product,
                                addedBy:email2
                              })).then((response)=>{
                                if(response.payload.success){
                                  setLoading(false);
                                  Swal.fire(
                                      "SUCCESS!",
                                      "We received your loan payment",
                                      "success"
                                    );
                                  setTimeout(()=>{
                                      navigate('/viewpayment/'+id)
                                  },3000)
                                }
                              })
                            }
                        })
                     }
                 
                })
      }else {
        dispatch(newSms({
          phonenumber:phonenumber,
          message:`Your bank payment ${code}, of Ksh${Math.round(amount).toLocaleString()} has been received. Your current balance is Ksh${Math.round(reducingBalance).toLocaleString()}`
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
                    dispatch(newPayment({
                      loanid:id,
                      name:fullname,
                      idnumber:idnumber,
                      phonenumber:phonenumber,
                      amount:amount,
                      reducingbalance:Number(reducingBalance),
                      transactioncode:code,
                      mode:mode,
                      product:product,
                      addedBy:email2
                    })).then((response)=>{
                      if(response.payload.success){
                        setLoading(false);
                        Swal.fire(
                            "SUCCESS!",
                            "We received your loan payment",
                            "success"
                          );
                        setTimeout(()=>{
                            navigate('/viewpayment/'+id)
                        },3000)
                      }
                    })
                     
                  }
              })
           }
       
      })
      }
    
    
      
    }
     useEffect(()=>{
     dispatch(getLoan())

     },[dispatch,phonenumber])
    return(
        <DashboardWrapper>
            <Toast/>
          

           {!method && <div className="mt-2 ">
            <h4>Choose Payment Method</h4>
            <div className="flex flex-row justify-between items-center text-center w-1/2">
              <div className="flex flex-row">
              <input type='radio' name="mode" value='Mpesa' onChange={onChange}  />
                <img src={mpesa} alt="" className="h-28 w-24 mx-2"/>
              </div>
              <div className="flex flex-row">
              <img src={bank} alt="" className="h-24 w-24 mx-2"/>
              <input type='radio' name='mode' value='Bank' onChange={onChange}/>
              </div>
            </div>
            <div className="flex justify-between mt-2">
            <Button variant="contained" color="primary" onClick={()=>navigate('/viewpayment/'+id)}>Back</Button>
            <Button variant='contained' color='success'  onClick={()=>setMethod(true)}>Next</Button>
            </div>
           </div>}

        {mode === 'Mpesa' && method ? <div>
          {loading ? <div className=" flex flex-row items-center text-center w-full justify-center mt-2">
          <CustomLoading/>
           <h3 className="text-purple-500 mx-2">STK PUSH HAS BEEN SENT TO YOUR PHONE {phonenumber}</h3>
          </div> : 
          <>
             <Input 
        name='amount'
        value={amount}
        handleChange={onChange}
        label='Amount'
        icon={<GiPayMoney/>}/>
        {/* <select 
        name='mode'
        value={mode}
        onChange={onChange}
        className="w-full mt-2 rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
             <option value=''>Choose Mode</option>
            <option value='MPESA'>MPESA</option>
            <option value='Bank'>Bank</option>
        </select> */}
        <div className='flex justify-between mt-2'>
            <Button variant="contained" color="primary" onClick={()=>setMethod(false)}>Back</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Add</Button>
          </div>
          </>}
          </div> : null}

          {mode === 'Bank' && method ? <div>
        <Input 
        name='amount'
        value={amount}
        handleChange={onChange}
        label='Amount'
        icon={<GiPayMoney/>}/>
        <Input 
        name='code'
        value={code}
        handleChange={onChange}
        label='Bank Transaction Code'
        icon={<GiZBrick/>}/>
        <div className='flex justify-between mt-2'>
            <Button variant="contained" color="primary" onClick={()=>setMethod(false)}>Back</Button>
            <Button variant="contained" color="success" onClick={handleBankSubmit}>Add</Button>
        </div></div>:null}
        </DashboardWrapper>
    )
}