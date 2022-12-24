import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { DashboardWrapper } from "../../Components";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getLoan } from "../../redux/loanSlice";
import { Divider } from "@mui/material";
import client from "../../api/client";
import {FcPrint} from 'react-icons/fc'
import { logo } from '../../assets';
export default function ViewStatement(){
    const dispatch = useDispatch();
    const {loanInfo} = useSelector(state=>state.loan);
    const {id} = useParams();
    const [data,setData] = useState([])
    const date = new Date().toISOString().slice(0, 10);
    const day = 24 * 60 * 60 * 1000;
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric"
  };
    async function getPayment(){
        await client.post('loanpay',{
         loanid: id
        }).then((response)=>{
           setData(response.data.payment)
        }).catch(err=>console.log(err))
      };
      const columns = [
        {
          field:'transactioncode',
          headerName:'Mpesa Code',
          width:120,
 
       },
          {
            field:'amount',
            headerName:'Amount',
            width:100,
       
         },
         {
            field:'reducingbalance',
            headerName:'Reducing Balance',
            width:130,
            valueFormatter:({ value }) => value.toLocaleString()
         },
         {
          field:'payday',
          headerName:'Date',
          width:115,

       },

        ];
        const pay = Math.round(loanInfo.amount-loanInfo.balance).toLocaleString();
        const i = loanInfo.initiation;
        const reducingbalance = Math.round(loanInfo.balance * (1/30*loanInfo.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(i.replace(/-/g, "/")).getTime())/day) + loanInfo.balance).toLocaleString()
      //   if(params.row.initiation === "-"){
      //    return Math.round(params.row.balance * (1/30*params.row.rate/100) * 0).toLocaleString()
      //  }else {
      //    return Math.round(params.row.balance * (1/30*params.row.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(params.row.initiation.replace(/-/g, "/")).getTime())/day) ).toLocaleString()
      //  }
    useEffect(()=>{
        dispatch(getLoan())
        getPayment()
      
    })
    return(
    <DashboardWrapper>
      <div className='float-right mb-4 '>
      <FcPrint className="text-3xl " onClick={()=>window.print()}/>
      </div>

   <div className='mt-2 justify-center items-center border border-black rounded-md h-full w-full'>
  <div className="text-center justify-center items-center">
  <div className=' flex justify-center items-center'>
  <img src={logo} alt='' className='h-24 w-24 justify-center items-center '/>
  </div>

   <h5>MariCredit</h5>
  <h5 className="text-center font-bold">Loan Statement</h5>
   <p>{new Date().toLocaleDateString("en", options)}</p>
   </div>  

    <div className="mx-2 justify-center items-center mt-5">
    <div className="flex justify-between">
     <div>
        <p><b>Name:{" "}{loanInfo.fullname}</b></p>
        <p><b>Phone:{" "}{loanInfo.phonenumber}</b></p>
        <p><b>IDNo.:{" "}{loanInfo.idnumber}</b></p>
        <p><b>Job:{" "}{loanInfo.job}</b></p>
     </div>
     <div className='mr-20'>
        <p><b>Account No:{loanInfo.loanID}</b></p>
        <p><b>Product:{loanInfo.product}</b></p>
        <p><b>Rate:{loanInfo.rate}% p.m</b></p>
        <p><b>Principal:Ksh{loanInfo.amount.toLocaleString()}</b></p>
     </div>
     <div className='mr-20'>
     <p><b>Total Payment:Ksh{pay}</b></p>
     <p><b>Current Balance:{reducingbalance}</b></p>
        <p><b>Initiation date:{loanInfo.initiation}</b></p>
        <p><b>Due date:{loanInfo.due}</b></p>
   
         
     </div>
    </div>
    </div> 
    <Divider sx={{height:25,backgroundColor:'black'}}><p className="text-center font-bold text-white">Transactions</p></Divider>
    <Box sx={{ height:300, width: '100%' }}>  
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row)=>row._id}
        style={{fontFamily:"Cursive"}}
        />
        </Box>
        </div>
    </DashboardWrapper>
    )
}