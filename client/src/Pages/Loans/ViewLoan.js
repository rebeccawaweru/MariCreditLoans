import { DashboardWrapper } from "../../Components";
import {useDispatch,useSelector} from "react-redux";
import { Details } from "../Components";
import {CiPercent} from 'react-icons/ci'
import {FcAddDatabase,FcPrevious,FcClock,FcMoneyTransfer,FcBriefcase,FcStatistics,FcPackage,FcPhone,} from "react-icons/fc";
import {TiBusinessCard} from "react-icons/ti"
import {TfiEmail} from 'react-icons/tfi'
import {MdOutlinePersonPin} from 'react-icons/md'
import {CgSandClock} from 'react-icons/cg'
import {GiReceiveMoney} from 'react-icons/gi'
import { useEffect, useState } from "react";
import { getLoan } from "../../redux/loanSlice";
import { useNavigate,useParams} from "react-router-dom";
import {Chip } from "@mui/material";
export default function ViewLoan(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reducingBalance,setreducingBalance] = useState(0)
  const {id} = useParams()
  const {fullname,email,phonenumber,idnumber,job,product,amount,tenature,period,rate,interest,back,front,finalAmount,balance,due,initiation,request}= useSelector(state=>state.loan.loanInfo);
   useEffect(()=>{
    dispatch(getLoan()).then(()=>{
        const date = new Date().toISOString().slice(0, 10)
        const days = new Date(date.replace(/-/g, "/")).getTime() - new Date(initiation.replace(/-/g, "/")).getTime();
       const r = 1/30*rate/100
       //p*r*t
   
       if(initiation === '-' ){
        setreducingBalance(balance)
       }else{
        setreducingBalance((balance * r *days/(60 * 60 * 24 * 1000)) + balance)
       }       
       
    })
   },[dispatch,balance,initiation,rate])  
    return(
        <DashboardWrapper>
        <div className='float-right text-blue-500 py-2 font-bold flex hover:text-black' onClick={()=>navigate('/viewpayment/'+id)}><FcAddDatabase className='text-xl'/>Payments</div>
        <div>
          <div className="mt-2">
          <Chip variant="outlined" label={request} color='success'/>
          </div>
          
            <div className="w-5/5 h-4/5   py-2 bg-white-100 space-y-4 ">
            <p className="text-blue-500 font-bold">Personal Information</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 ">
            <Details detail={fullname} icon={<MdOutlinePersonPin/>}/>
            <Details detail={email} icon={<TfiEmail/>}/>
            <Details detail={phonenumber} icon={<FcPhone/>}/>
            <Details detail={idnumber} icon={<TiBusinessCard/>}/>
            <Details detail={job} icon={<FcBriefcase />}/>
            </div>
             <p  className="text-blue-500 font-bold">Loan details</p>
                <div className="grid grid-cols-3">
                    <div className="mb-2">
                    <p className="text-sm font-bold">{" Loan Product"}</p>
                <Details detail={product} icon={<FcPackage/>}/>
                    </div>
             <div >
             <p className="text-sm font-bold">{"Principal"}</p>
                <Details detail={Math.round(amount).toLocaleString()} icon={<GiReceiveMoney/>}/>
             </div>
              <div>
              <p className="text-sm font-bold">{" Period"}</p>
               <Details detail={String(tenature+period)} icon={<CgSandClock/>}/>
              </div>
             
              <div>
              <p className="text-sm font-bold">{" Interest Rate"}</p>
                <Details detail={rate + '% p.m'} icon={<CiPercent/>}/>
              </div>
               <div>
               <p className="text-sm font-bold">{"Simple Interest"}</p>
                <Details detail={interest} icon={<FcStatistics/>}/>
               </div> 
           <div className="mb-2">
              <p className="text-sm font-bold">{"Reducing Balance"}</p>
                <Details detail={Math.round(reducingBalance).toLocaleString()} icon={<FcMoneyTransfer/>}/>
              </div>
                </div>
                <div className="grid grid-cols-3">
                <div>
              <p className="text-sm font-bold">{"Initiation Date"}</p>
                <Details detail={initiation} icon={<FcClock/>}/>
              </div> 
              <div>
              <p className="text-sm font-bold">{"Due Date"}</p>
                <Details detail={due} icon={<FcClock/>}/>
              </div> 
              <div className="mb-2">
              <p className="text-sm font-bold">{"Final Amount"}</p>
                <Details detail={Math.round(finalAmount).toLocaleString()} icon={<FcMoneyTransfer/>}/>
              </div>
            
                </div>
                <p  className="text-blue-500 font-bold">Uploads</p>
                <div  className="grid grid-cols-2  w-full space-x-1  ">
                <div className="w-4/5 h-40">
                <img src={front} alt='' className="h-full w-full"/>
               </div>
               <div className="w-4/5 h-40">
                <img src={back} alt='' className="h-full w-full"/>
               </div>
                </div>
               
              

            </div> 
            <div className="flex justify-between space-x-46">
            <div onClick={()=>navigate('/loans')} className="flex mt-5">
            <FcPrevious className="text-lg "/>
            <p className="-mt-1">Back</p>
            </div>
          
            </div> 
            </div> 
        </DashboardWrapper>
    )
}