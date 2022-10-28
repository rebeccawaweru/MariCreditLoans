import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import {FcInfo,FcFullTrash,FcEditImage} from 'react-icons/fc'
const columns = [
  { field: 'fullname', 
  headerName: 'Full Name',
   width: 150 },
  {
    field: 'phonenumber',
    headerName: 'Phone Number',
    width: 150,
    editable: true,
  },
  {
    field: 'idnumber',
    headerName: 'ID Number',
    width: 100,
    editable: true,
  },
//   {
//     field: 'job',
//     headerName: 'Occupation',
//     width: 100,
//     editable: true,
//   },
  {
    field: 'product',
    headerName: 'Product',
    width: 100,
    editable: true,
  },
  {
    field: 'amount',
    headerName: 'Principal',
    width: 100,
    editable: true,
  },
  {
    field: 'tenature',
    headerName: 'Tenature',
    width: 30,
    editable: true,
  },
  {
    field:'period',
    headerName: '',
    width: 70,
    editable: true,
  },
  {
    field: 'finalAmount',
    headerName: 'Total Due',
    width: 100,
    editable: true,
  },
  {
    field: 'request',
    headerName: 'Status',
    width: 100,
    editable: true,
  },
  {field: "Action",
  renderCell: (cellValues) => {
    return (
     <div className='space-x-2 flex'>
      <FcInfo className='text-lg'/> 
      <FcEditImage className='text-lg'/>
     <FcFullTrash className='text-lg'/>
     </div>
    );
  }}
];
export default function Loans() {
   const [data,setData] = useState([])
   async function getLoans(){
    await axios.get('http://localhost:5000/loan').then(response=>{
        setData(response.data.loan)
    })
   }
   useEffect(()=>{
    getLoans()
   },[data])
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row)=>row._id}
      />
    </Box>
  );
}
