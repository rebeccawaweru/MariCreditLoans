import  React,{useEffect} from 'react';
import { DataGrid} from '@mui/x-data-grid';
import {FcSearch} from 'react-icons/fc'
import { DashboardWrapper, Input } from "../../Components";
import { useDispatch,useSelector } from 'react-redux';
import { getLoans } from '../../redux/loanSlice';
import { useNavigate } from 'react-router-dom';
import {Box } from '@mui/material';
import { useState } from 'react';
export default function ClosedLoans(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search,setSearch] = useState('')
    const {data} = useSelector(state=>state.loan)
    const loandata = 
    data.filter((item,key)=>{
       return item.active === true 
    });
    const tabledata = 
        loandata.filter((item,key) =>
          item.fullname.includes(search.toUpperCase())
        );
 
      
      const handleSearch = (e)=>{
         setSearch(e.target.value);
         console.log(e.target.value)
      }
    const date = new Date().toISOString().slice(0, 10);
    const day = 24 * 60 * 60 * 1000;
    const handleView = (id)=>{
        localStorage.setItem('loan', id);
        navigate('/viewstatement/'+id)
      }
    const columns = [
        // {
        //   field:'loanID',
        //   headerName: 'Loan ID',
        //   width:80
        // },
        { field: 'fullname', 
        headerName: 'Full Name',
         width: 150 },
        // {
        //   field: 'phonenumber',
        //   headerName: 'Phone Number',
        //   width: 150,
        //   editable: true,
        // },
        // {
        //   field: 'idnumber',
        //   headerName: 'ID Number',
        //   width: 90,
        //   editable: true,
        // },
        {
          field: 'product',
          headerName: 'Product',
          width: 85,
          editable: true,
        },
        {
            field: 'rate',
            headerName: 'Rate',
            width: 80,
        
            valueFormatter:({ value }) => value + '% p.m'
          },
        {
          field: 'amount',
          headerName: 'Principal',
          width: 80,
          editable: true,
          valueFormatter:({ value }) => value.toLocaleString()
        },
      
        {
          field: 'tenature',
          headerName: 'Time',
          width: 80,
         valueGetter:function(params){
            return params.row.tenature + " " + params.row.period
         }
        },
       
        // {
        //   field:'Interest',
        //   width: 70,
        //   valueGetter: function(params) {
        //     if(params.row.initiation === "-"){
        //       return Math.round(params.row.balance * (1/30*params.row.rate/100) * 0).toLocaleString()
        //     }else {
        //       return Math.round(params.row.balance * (1/30*params.row.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(params.row.initiation.replace(/-/g, "/")).getTime())/day) ).toLocaleString()
        //     }
        //   }
        // },
        {
          headerName:'A.Paid',
          width:65,
          valueGetter: function(params){
         return Math.round(params.row.amount-params.row.balance).toLocaleString()
        },
 
      },
                {
      field: 'Account Balance',
      width:120,
      valueGetter: function(params) {
       
          return Math.round(params.row.accountbalance).toLocaleString()
        
      }
      // valueGetter: (params) => (params.row.balance * (1/30*params.row.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(params.row.initiation.replace(/-/g, "/")).getTime())/day) + params.row.balance ),
    },
        {
          field: 'initiation',
          headerName: 'Initiation Date',
          width: 110,
          editable: true,
        },
        {
          field: 'due',
          headerName: 'Loan Maturity',
          width: 110,
          editable: true,
        },
        {field:"View",
        renderCell:(cellValues)=>{
        return <Box className='text-green-500 font-bold' onClick={()=>handleView(cellValues.id)}>STATEMENT</Box>
        }}
      
      ];
    useEffect(()=>{
    dispatch(getLoans())
    },[dispatch])

    return(
        <DashboardWrapper>
      
        <Box className='w-1/4 -mt-2'>
        <Input placeholder='Search name...' icon={<FcSearch/>} value={search} handleChange={handleSearch} />
        </Box>
     
      
      {search ?
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
      }, }}> <DataGrid
        rows={tabledata}
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

      /></Box> :        
        <Box sx={{ height: 400,
        width: '100%',
        fontFamily:'arial',
        '& .rejected': {
         backgroundColor: '#ff943975',
         color: '#1a3e72',
       },
       '& .approved': {
         backgroundColor: 'lightgreen',
         color: '#1a3e72',
       }, }}> <DataGrid
      rows={loandata}
      columns={columns}
      getCellClassName={(params) => {
        if (params.value === 'Rejected') {
          return params.value ='rejected' ;
        }
        return params.value === 'Approved' ? 'approved' : null;
      }}
      pageSize={5}
      rowsPerPageOptions={[5]}
      experimentalFeatures={{ newEditingApi: true }}
      getRowId={(row)=>row._id}
      style={{fontFamily:"arial"}}
    /></Box> }
     
        </DashboardWrapper>
    )
}