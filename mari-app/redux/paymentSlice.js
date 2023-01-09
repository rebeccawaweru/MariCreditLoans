import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../api/client'

export const newPayment = createAsyncThunk('/payment/newpayments', async(payment, {rejectWithValue})=>{
    try {
      const response = await client.post('payment',payment);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const newSms = createAsyncThunk('/payment/confirmSms', async(payment, {rejectWithValue})=>{
  try {
   const response = await client.post('sms',payment) ;
   return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
export const confirmPayment = createAsyncThunk('/payment/confirmpayments', async(payment, {rejectWithValue})=>{
    try {
      const response = await client.post('confirmpayment',payment);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const getPayments = createAsyncThunk('/payment/getpayments', async(payment, {rejectWithValue})=>{
    try {
      const response = await client.get('payment');
      return response.data.payment
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getPayment = createAsyncThunk('/payment/getpayment', async(payment, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('payment')
      const response = await client.get('payment/'+id);
      return response.data.payment     
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const updatePayment= createAsyncThunk('/payment/updatepayment', async(payment, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('payment')
      const response = await client.patch('payment/'+id, payment);
      return response.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deletePayment = createAsyncThunk('/payment/deletepayment', async(payment, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('payment')
      const response = await client.delete('payment/'+id);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        paymentInfo:{
          name:'',
          idnumber:'',
          phonenumber:'',
          product:'',
          payday:'',
          amount:'',
          mode:'',
          addedBy:''

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
      [newPayment.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [newPayment.fulfilled]:(state)=>{
       
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [newPayment.rejected]:(state,action)=>{
      
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [confirmPayment.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [confirmPayment.fulfilled]:(state)=>{
        // toast.success('Payment created successfully')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [confirmPayment.rejected]:(state,action)=>{
     
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [getPayments.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [getPayments.fulfilled]:(state,action)=>{
        state.pending = false;
        state.success = true;
        state.error = false;
        state.data = action.payload
      },
      [getPayments.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [getPayment.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [getPayment.fulfilled]:(state,action)=>{
        state.pending = false;
        state.success = true;
        state.error = false;
        state.paymentInfo = action.payload
      },
      [getPayment.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [updatePayment.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [updatePayment.fulfilled]:(state)=>{
        // toast.success('Payment updated successfully')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [updatePayment.rejected]:(state,action)=>{
      
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [deletePayment.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [deletePayment.fulfilled]:(state)=>{
    
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [deletePayment.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [newSms.pending]:(state)=>{
        state.pending = true;
        state.error = false;
        state.success = false
      },
      [newSms.fulfilled]:(state)=>{
        state.pending = false;
        state.error = false;
        state.success = true;
      },
      [newSms.rejected]:(state)=>{
        state.pending = false;
        state.error = true
        state.success = false;
      }
      
    }
})

export default paymentSlice.reducer