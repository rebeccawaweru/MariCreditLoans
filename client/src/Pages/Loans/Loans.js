import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import {FcInfo,FcFullTrash,FcEditImage,FcAddDatabase} from 'react-icons/fc'
import { DashboardWrapper,CustomModal, Toast } from '../../Components';
import { useDispatch,useSelector } from 'react-redux';
import { deleteLoan,getLoans } from '../../redux/loanSlice';
import { useNavigate } from 'react-router-dom';
export default function Loans() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const {data} = useSelector(state=>state.loan)

  const handleView = (id)=>{
    localStorage.setItem('loan', id);
    navigate('/viewloan/'+id)
  }
  const handleUpdate = (id)=>{
    localStorage.setItem('loan', id);
    navigate('/updateloan/'+id)
  }
   const handleDelete = (id)=>{
    localStorage.setItem('loan', id)
    setOpen(true)
   };
   const handleClose = ()=>{
    setOpen(false);
    localStorage.removeItem('loan')
  }
  const handleConfirm = (e)=>{
    e.preventDefault()
     dispatch(deleteLoan())
     setOpen(false)
  }
   useEffect(()=>{
    dispatch(getLoans())
   },[data])
   const columns = [
    { field: 'fullname', 
    headerName: 'Full Name',
     width: 150 },
    // {
    //   field: 'phonenumber',
    //   headerName: 'Phone Number',
    //   width: 150,
    //   editable: true,
    // },
    {
      field: 'idnumber',
      headerName: 'ID Number',
      width: 100,
      editable: true,
    },
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
      valueFormatter:({ value }) => value.toLocaleString()
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 100,
      editable: true,
      valueFormatter:({ value }) => value + '%'
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
      field:'interest',
      headerName: 'Interest',
      width: 90,
      editable: true,
      valueFormatter:({ value }) => value.toLocaleString()
    },
    {
      field: 'finalAmount',
      headerName: 'Total Due',
      width: 140,
      editable: true,
      valueFormatter:({ value }) => value.toLocaleString()
    },
    {
      field: 'balance',
      headerName: 'R.Balance',
      width: 140,
      editable: true,
      valueFormatter:({ value }) => value.toLocaleString()
    },
    {
      field: 'initiation',
      headerName: 'Initiation Date',
      width: 120,
      editable: true,
    },
    {
      field: 'due',
      headerName: 'Loan Maturity',
      width: 120,
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
        <FcInfo onClick={()=>handleView(cellValues.id)} className='text-lg'/> 
        <FcEditImage onClick={()=>handleUpdate(cellValues.id)} className='text-lg'/>
       <FcFullTrash onClick={()=>handleDelete(cellValues.id)} className='text-lg'/>
       </div>
      );
    }}
  ];
  return (
    <DashboardWrapper>
      <Toast/>
      <div className='float-right text-blue-500 py-2 font-bold flex hover:text-black' onClick={()=>navigate('/apply')}><FcAddDatabase className='text-xl'/>Add Loan</div>
        <p className="text-blue-500 py-2 font-bold "> Loans</p>
    <Box sx={{ height: 450,
       width: '100%',
       fontFamily:'arial',
       '& .rejected': {
        backgroundColor: '#ff943975',
        color: '#1a3e72',
      },
      '& .approved': {
        backgroundColor: 'lightgreen',
        color: '#1a3e72',
      }, }}>
      <CustomModal subject='delete loan?' open={open} handleDelete={handleConfirm} handleClose={handleClose} title='Delete' color='error' />
        
      <DataGrid
        rows={data}
        columns={columns}
        getCellClassName={(params) => {
          if (params.value === 'Rejected') {
            return params.value ='rejected' ;
          }
          return params.value === 'Approved' ? 'approved' : null;
        }}
        pageSize={6}
        rowsPerPageOptions={[6]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row)=>row._id}
        style={{fontFamily:"arial"}}
      />
    </Box>
    </DashboardWrapper>
  );
}
