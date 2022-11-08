import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../api/client'
import { toast } from "react-toastify";
export const newLoan = createAsyncThunk('/loan/newloans', async(loan, {rejectWithValue})=>{
    try {
      const response = await client.post('loan',loan);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const getLoans = createAsyncThunk('/loan/getloans', async(loan, {rejectWithValue})=>{
    try {
      const response = await client.get('loan');
      return response.data.loan
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getLoan = createAsyncThunk('/loan/getloan', async(loan, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('loan')
      const response = await client.get('loan/'+id);
      return response.data.loan     
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateLoan = createAsyncThunk('/loan/updateloan', async(loan, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('loan')
      const response = await client.patch('loan/'+id, loan);
      return response.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteLoan = createAsyncThunk('/loan/deleteloan', async(loan, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('loan')
      const response = await client.delete('loan/'+id);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const loanSlice = createSlice({
    name:"loan",
    initialState:{
        loanInfo:{
          name:'',
          phonenumber:''
        },
        pending: false,
        success:false,
        error: false,
        msg:'',
        data:[]   
    },
    reducers:{

    },
    extraReducers:{
      [newLoan.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [newLoan.fulfilled]:(state)=>{
        toast.success('Loan created successfully')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [newLoan.rejected]:(state,action)=>{
        if(action.payload === 'Network Error'){
          toast.error('Please check your internet and try again')
        }
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [getLoans.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [getLoans.fulfilled]:(state,action)=>{
        state.pending = false;
        state.success = true;
        state.error = false;
        state.data = action.payload
      },
      [getLoans.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [getLoan.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [getLoan.fulfilled]:(state,action)=>{
        state.pending = false;
        state.success = true;
        state.error = false;
        state.loanInfo = action.payload
      },
      [getLoan.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [updateLoan.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [updateLoan.fulfilled]:(state)=>{
        toast.success('Loan updated successfully')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [updateLoan.rejected]:(state,action)=>{
        if(action.payload === 'Network Error'){
          toast.error('Please check your internet and try again')
        }
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [deleteLoan.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [deleteLoan.fulfilled]:(state)=>{
        toast.warning('Loan deleted successfully')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [deleteLoan.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      
      
    }
})

export default loanSlice.reducer