import  React,{useState,useEffect} from 'react';
import { DashboardWrapper } from "../../Components";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {FcInfo,FcFullTrash,FcEditImage} from 'react-icons/fc'
const columns = [
    { field: 'name', 
    headerName: 'Name',
     width: 150 },
    {
      field: 'interest',
      headerName: 'Rate',
      width: 150,
      editable: true,
    },
    {
      field: 'addedBy',
      headerName: 'Added By:',
      width: 150,
      editable: true,
    },
    {field: "Action",
    width: 150,
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
export default function Products(){
    const [data,setData] = useState([])
   async function getProduct(){
    await axios.get('http://localhost:5000/product').then(response=>{
        setData(response.data.product)
    })
   }
   useEffect(()=>{
    getProduct()
   },[data])
    return(
        <>
        <DashboardWrapper>
    
            <div className='px-4 '>
            <p className="text-blue-500 py-2 font-bold"> Loan Products</p>
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
            </div>
   
        </DashboardWrapper>
        </>
    )
}