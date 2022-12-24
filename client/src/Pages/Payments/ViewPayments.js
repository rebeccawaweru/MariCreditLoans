import { DashboardWrapper,ExportExcel,} from "../../Components";
import client from "../../api/client";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useParams,useNavigate } from "react-router-dom";
import {FcAddDatabase,FcPrint} from 'react-icons/fc'
export default function ViewPayments(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [data,setData] = useState([])
    async function getPayment(){
      await client.post('loanpay',{
       loanid: id
      }).then((response)=>{
         setData(response.data.payment)
         console.log(id)
      }).catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        console.log(id)
     getPayment()
    },[])
    const columns = [
      {
        field:'transactioncode',
        headerName:'Mpesa Code',
        width:120,
        editable:true
     },
        {
          field:'amount',
          headerName:'Amount',
          width:100,
          editable:true
       },
    //    {
    //     field:'mode',
    //     headerName:'Mode',
    //     width:150,
    //     editable:true
    //  },
        {
          field:'product',
          headerName:'Loan Product',
          width:150,
          editable:true
       },
       {
        field:'payday',
        headerName:'Date',
        width:150,
      
     },
        // {
        //   field: 'addedBy',
        //   headerName: 'Added By:',
        //   width: 150,
        //   editable: true,
        // },
      
        // {field: "Action",
        // width: 110,
        // renderCell: (cellValues) => {
        //   return (
        //    <div className='space-x-4 flex'>
        //     <FcEditImage className='text-lg' onClick={()=>handleUpdate(cellValues.id)}/>
        //    <FcFullTrash onClick={()=>handleDelete(cellValues.id)} className='text-lg'/>
        //    </div>
        //   );
        // }}
      ];
    return(
        <DashboardWrapper>
             <div className='float-right text-blue-500 py-2 font-bold flex hover:text-black' onClick={()=>navigate('/newpayment/'+id)}><FcAddDatabase className='text-xl'/>Add Payment</div>
         <p className="text-blue-500 py-2 font-bold ">Payments</p> 
         <div className="mb-2 flex space-x-2">
         <ExportExcel apiData={data} fileName='Payment Data' />
         <FcPrint className="text-3xl" onClick={()=>window.print()}/>
         </div>
     
      <Box sx={{ height:400, width: '100%' }}>  
  
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
        </DashboardWrapper>
    )
   
}