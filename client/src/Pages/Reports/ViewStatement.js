import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { DashboardWrapper } from "../../Components";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getLoan,reset } from "../../redux/loanSlice";
import { Divider, Grid, Stack } from "@mui/material";
import client from "../../api/client";
import {FcPrint} from 'react-icons/fc'
import { logo } from '../../assets';
import JsPDF from 'jspdf';

export default function ViewStatement(){
    const dispatch = useDispatch();
    const {loanInfo} = useSelector(state=>state.loan);
    const {id} = useParams();
    const [data,setData] = useState([])
    const [pay,setPay] = useState(0);
    const [reduced,setReduced] = useState(0);
    const date = new Date().toISOString().slice(0, 10);
    const account = loanInfo.balance * -1;
    const day = 24 * 60 * 60 * 1000;
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric"
  };
 
      const columns = [
        {
          field:'transactioncode',
          headerName:'Transaction Code',
          width:130,
   

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
         valueGetter:function(params){
            if(params.row.reducingbalance <= 0){
               return 0
            }else{
               return params.row.reducingbalance
            }
         }
            
            // valueFormatter:({ value }) => value.toLocaleString()
         },
         {
          field:'payday',
          headerName:'Date',
          width:115,

       },

        ];

        
       
      //   if(params.row.initiation === "-"){
      //    return Math.round(params.row.balance * (1/30*params.row.rate/100) * 0).toLocaleString()
      //  }else {
      //    return Math.round(params.row.balance * (1/30*params.row.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(params.row.initiation.replace(/-/g, "/")).getTime())/day) ).toLocaleString()
      //  }
    useEffect(()=>{   
      async function getPayment(){
      await client.post('loanpay',{
       loanid: id
      }).then((response)=>{
         setData(response.data.payment)
         
      }).catch(err=>console.log(err))
    };

        dispatch(getLoan()).then(()=>{
         reset()
        
         setPay(Math.round(loanInfo.amount-loanInfo.balance).toLocaleString())
         const i = loanInfo.initiation;
         setReduced(Math.round(loanInfo.balance * (1/30*loanInfo.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(i.replace(/-/g, "/")).getTime())/day) + loanInfo.balance).toLocaleString())
        })
        getPayment()
     
    },[date, day, dispatch, id, loanInfo.amount, loanInfo.balance, loanInfo.initiation, loanInfo.rate])
    const generatePDF = () => {

      const report = new JsPDF('landscape','pt','a3');
      report.html(document.querySelector('#report')).then(() => {
          report.save('report.pdf');
      });
   }
    return(
    <DashboardWrapper>
      
      <div className='float-right mb-4 '>
      <FcPrint className="text-3xl " onClick={generatePDF}/>
      </div>
  
   <div id='report' className='mt-2 justify-center items-center  rounded-md  p-4'>
  <div className="text-center justify-center items-center">
  <div className=' flex justify-center items-center'>
  <img src={logo} alt='' className='h-24 w-24 justify-center items-center '/>
  </div>

   <h5>MariCredit</h5>
  <h5 className="text-center font-bold">Loan Statement</h5>
   <p>{new Date().toLocaleDateString("en", options)}</p>
   </div>  

   
      <Stack direction='row' spacing={4} width='100%' sx={{justifyContent:'center',alignItems:'center,',marginTop:2}}>
      <div>
        <p><b>Name:{" "}{loanInfo.fullname}</b></p>
        <p><b>Phone:{" "}{loanInfo.phonenumber}</b></p>
        <p><b>IDNo.:{" "}{loanInfo.idnumber}</b></p>
        <p><b>Job:{" "}{loanInfo.job}</b></p>
     </div>
     <div>
        <p><b>Account No:{loanInfo.loanID}</b></p>
        <p><b>Product:{loanInfo.product}</b></p>
        <p><b>Rate:{loanInfo.rate}% p.m</b></p>
        <p><b>Principal:Ksh{loanInfo.amount}</b></p>
     </div>
     <div>
     <p><b>Total Payment:Ksh{pay}</b></p>
     {loanInfo.active ? <p><b>Account Balance:Ksh{loanInfo.accountbalance}</b></p>:
        <p><b>Current Balance:{reduced}</b></p>}
  
        <p><b>Initiation date:{loanInfo.initiation}</b></p>
        <p><b>Due date:{loanInfo.due}</b></p>
     </div>
      </Stack>
   
      <div className='mt-2 mb-2'>
      <Divider><p className="text-center text-black"><i>Transactions</i></p></Divider>
      </div>
      
     
     
{/* <table className='w-3/4 h-full '>
   
      <tr style={{border:'1px solid black', background:'grey',height:30,padding:2,paddingBottom:4}}>
      <th>Transaction Code</th>
      <th>Amount</th>
      <th>Reducing Balance</th>
      <th>Date</th>
      </tr>
      {data.map((info,key)=>{
      return <tr style={{border:'1px solid black',height:30,padding:2,paddingBottom:4}}>
         <td>{info.transactioncode}</td>
         <td>{info.amount}</td>
         <td>{info.reducingbalance}</td>
         <td>{info.payday}</td>
      </tr>
          })}
    </table> */}
   
  
 
    <Box sx={{ height:400, width: '100%', }}>  
    {data.length !== 0 ? <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        getRowId={(row)=>row._id}
      
        /> :  
        <div className='text-center mt-5'>
        <h4>No Payments </h4>
        </div>  }
      
        </Box> 
        </div>
    </DashboardWrapper>
    )
}