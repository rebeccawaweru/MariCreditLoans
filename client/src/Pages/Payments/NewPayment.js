import {DashboardWrapper,Input, Toast } from "../../Components";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {GiPayMoney} from 'react-icons/gi'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateLoan,getLoan } from "../../redux/loanSlice";
import client from "../../api/client";
import { toast } from "react-toastify";
export default function NewPayment(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = localStorage.getItem('loan')
    const {email} = useSelector(state=>state.user.userInfo)
    const {fullname,idnumber,phonenumber,product,_id,balance} = useSelector(state=>state.loan.loanInfo);
    const [data,setData] = useState({
        amount:'',
        mode:'',
    });
    const {amount,mode} = data;
    const onChange = (e)=>{
        setData({...data, [e.target.name]:e.target.value})

    }
    const handleSubmit = async ()=>{
        console.log(amount,mode,_id,fullname,idnumber,phonenumber,product,email)
        await client.post('/payment',{
            loanid:_id,
            name:fullname,
            idnumber:idnumber,
            phonenumber:phonenumber,
            product:product,
            amount:Number(amount),
            mode:mode,
            addedBy:email
        }).then((response)=>{
            console.log(response)
        if(response.data.success){
            const r = balance - Number(amount);
            console.log(r)
            dispatch(updateLoan({
              balance:r
            })).then((response)=>{
                console.log(response.payload)
                if(response.payload.success)
                   toast.success('Payment added successfully')
                setTimeout(()=>{
                    navigate('/payments')
                    },3000)
            })
        }
     })
    }
     useEffect(()=>{
     dispatch(getLoan())
     },[])
    return(
        <DashboardWrapper>
            <Toast/>
        <Input 
        name='amount'
        value={amount}
        handleChange={onChange}
        label='Amount'
        icon={<GiPayMoney/>}/>
        <select 
        name='mode'
        value={mode}
        onChange={onChange}
        className="w-full mt-2 rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
             <option value=''>Choose Mode</option>
            <option value='MPESA'>MPESA</option>
            <option value='BANK'>BANK</option>
        </select>
        <div className='flex justify-between mt-2'>
            <Button variant="contained" color="primary" onClick={()=>navigate('/viewloan/'+id)}>Back</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Add</Button>
          </div>
        </DashboardWrapper>
    )
}