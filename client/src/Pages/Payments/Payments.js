import { DashboardWrapper,ExportExcel} from "../../Components";
import { useDispatch,useSelector } from "react-redux";
import axios from 'axios'
import client from "../../api/client";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { FcPrint } from "react-icons/fc";
export default function Payments(){
    const dispatch = useDispatch();
    const [data,setData] = useState([])
    async function getPayment(){
      await client.get('/payment').then((response)=>{
         setData(response.data.payment)
         console.log(data)
      })
    }
    
    useEffect(()=>{
     getPayment()
    },[])
    const columns = [
        { field: 'name', 
        headerName: 'Name',
         width: 150 },
        {
          field: 'idnumber',
          headerName: 'ID',
          width: 100,
          editable: true,
        },
        {
           field:'phonenumber',
           headerName:'Phone',
           width:100,
           editable:true
        },
        {
          field:'amount',
          headerName:'Amount',
          width:70,
          editable:true,
          valueFormatter:({ value }) => value.toLocaleString()
       },
       {
        field:'mode',
        headerName:'Mode',
        width:100,
        editable:true
     },
     {
      field:'',
      headerName:'CODE',
      width:120,
      editable:true
   },
        {
          field:'product',
          headerName:'Loan Product',
          width:100,
          editable:true
       },
       {
        field:'payday',
        headerName:'Date',
        width:110,
        editable:true
     },
        {
          field: 'addedBy',
          headerName: 'Added By:',
          width: 150,
          editable: true,
        },
      
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
         <p className="text-blue-500 py-2 font-bold ">All Payments</p> 
         <div className="mb-2 flex space-x-2">
         <ExportExcel apiData={data} fileName='All Payments' />
         <FcPrint className="text-3xl" onClick={()=>window.print()}/>
         </div>
         <Box sx={{ height: 450, width: '100%' }}>  
         <DataGrid
        rows={data}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row)=>row._id}
              style={{fontFamily:"arial"}}
        />
        </Box>
        </DashboardWrapper>
    )
}