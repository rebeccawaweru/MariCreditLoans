import  React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {FcInfo,FcFullTrash,FcEditImage} from 'react-icons/fc'
import { useDispatch,useSelector } from 'react-redux';
import { getUsers } from '../../redux/userSlice';
const columns = [
    { field: 'fullname', 
    headerName: 'Name',
     width: 150 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'phonenumber',
      headerName: 'Phone Number',
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
export default function User(){
    const dispatch = useDispatch();
    const {data} = useSelector(state=>state.user)
    useEffect(()=>{
     dispatch(getUsers())
    },[])
    return(
    <>
    <div className='px-4 '>
    <p className="text-blue-500 py-2 font-bold">Users</p>
    <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
    rows={data}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    experimentalFeatures={{ newEditingApi: true }}
    getRowId={(row)=>row._id}
    style={{fontFamily:"arial"}}
    />
    </Box>
    </div>
    </>
    )
}