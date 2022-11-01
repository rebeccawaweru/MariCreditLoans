import  React,{useState,useEffect} from 'react';
import { DashboardWrapper,CustomModal,Toast } from "../../Components";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {FcFullTrash,FcEditImage,FcAddDatabase} from 'react-icons/fc'
import { useDispatch,useSelector } from 'react-redux';
import { getProducts,deleteProduct } from '../../redux/productSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Products(){
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const dispatch = useDispatch();
  const {data} = useSelector(state=>state.product)
  const handleDelete = async(id)=>{
    localStorage.setItem('product', id)
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false);
    localStorage.removeItem('product')
  }
  const handleConfirm =(e)=>{
    e.preventDefault()
    dispatch(deleteProduct()).then((response)=>{
      if(response.payload.success){
        toast.warning('Product deleted successfully')
        setTimeout(()=>{
          setOpen(false)
        },1000)
      }
    });
  }
  const handleUpdate = async(id)=>{
    localStorage.setItem('product', id)
   navigate('/updateproduct/'+id)
  }

  const columns = [
    { field: 'name', 
    headerName: 'Name',
     width: 150 },
    {
      field: 'interest',
      headerName: 'Rate',
      width: 70,
      editable: true,
    },
    {
      field: 'per',
      headerName: '',
      width: 70,
      editable: true,
    },
    {
      field: 'addedBy',
      headerName: 'Added By:',
      width: 150,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Date:',
      width: 150,
      editable: true,
    },
    {field: "Action",
    width: 110,
    renderCell: (cellValues) => {
      return (
       <div className='space-x-4 flex'>
        <FcEditImage className='text-lg' onClick={()=>handleUpdate(cellValues.id)}/>
       <FcFullTrash onClick={()=>handleDelete(cellValues.id)} className='text-lg'/>
       </div>
      );
    }}
  ];
   useEffect(()=>{
    dispatch(getProducts())
   },[data,dispatch])
    return(
        <>
        <DashboardWrapper>
          <Toast/>
       <div className='px-4 '>
       <div className='float-right text-blue-500 py-2 font-bold flex hover:text-black' onClick={()=>navigate('/newproduct')}><FcAddDatabase className='text-xl'/>Add Product</div>
        <p className="text-blue-500 py-2 font-bold "> Loan Products</p>
        <Box sx={{ height: 400, width: '100%' }}>
        <CustomModal open={open} subject='delete product?' handleDelete={handleConfirm} handleClose={handleClose} title='Delete' color='error' />
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
   
        </DashboardWrapper>
        </>
    )
}