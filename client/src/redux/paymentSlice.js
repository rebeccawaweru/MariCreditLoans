// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import client from "../api/client";
// export const newPayment = createAsyncThunk('/payments/newpayment', async(payment, {rejectWithValue})=>{
//     try {
//       const response = await client.post('payment', payment);
//       return response.data;
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// })
// export const getPayment = createAsyncThunk('/payments/getpayment', async(payment, {rejectWithValue})=>{
//     try {
//         const id = localStorage.getItem('payment')
//         const response = await client.get('payment/'+id);
//         return response.data.payment;   
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// })

// export const getPayments = createAsyncThunk('/payments/getpayments', async(payment, {rejectWithValue})=>{
//     try {
//         const response = await client.get('payment');
//         return response.data.payment;     
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// })

// export const updatePayment = createAsyncThunk('/payments/updatepayment', async(payment, {rejectWithValue})=>{
//     try {
//         const id = localStorage.getItem('payment')
//         const response = await client.patch('payment/'+id, payment);
//         return response.data.payment;  
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// })

// export const deletePayment = createAsyncThunk('/payments/deletepayment', async(payment, {rejectWithValue})=>{
//     try {
//         const id = localStorage.getItem('payment')
//         const response = await client.delete('payment/'+id);
//         return response.data.payment;  
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// })

// export const paymentSlice = createSlice({
//     name:"payment",
//     initialState:{
//         paymentInfo:{},
//         pending: false,
//         success:false,
//         error: false,
//         msg:'',
//         data:[]   
//     },
//     extraReducers:{
//         [newPayment.pending]:(state)=>{
//          state.pending = true,
//          state.success = false,
//          state.error = false
//         },
//         [newPayment.success]:(state)=>{
//             toast.success('Payment added')
//             state.pending = false,
//             state.success = true,
//             state.error = false
//         },
//         [newPayment.rejected]:(state,action)=>{
//             state.pending = false,
//             state.success = false,
//             state.error = true
//             state.msg = action.payload
//         },
//         [getPayment.pending]:(state)=>{
//             state.pending = true,
//             state.success = false,
//             state.error = false
//         },
//         [getPayment.success]:(state,action)=>{
//             state.paymentInfo = action.payload;
//             state.pending = false,
//             state.success = true,
//             state.error = false
//         },
//         [getPayment.rejected]:(state,action)=>{
//             state.pending = false,
//             state.success = false,
//             state.error = true
//             state.msg = action.payload
//         },
//         [getPayments.pending]:(state)=>{
//             state.pending = true,
//             state.success = false,
//             state.error = false
//         },
//         [getPayments.success]:(state,action)=>{
//             console.log(action.payload)
//             state.data = action.payload;
//             state.pending = false,
//             state.success = true,
//             state.error = false
//         },
//         [getPayments.rejected]:(state,action)=>{
//             state.pending = false,
//             state.success = false,
//             state.error = true
//             state.msg = action.payload
//         },
//         [updatePayment.pending]:(state)=>{
//             state.pending = true,
//             state.success = false,
//             state.error = false
//         },
//         [updatePayment.success]:(state)=>{
//             toast.success('Payment updated')
//             state.pending = false,
//             state.success = true,
//             state.error = false
//         },
//         [updatePayment.rejected]:(state,action)=>{
//             state.pending = false,
//             state.success = false,
//             state.error = true
//             state.msg = action.payload
//         },
//         [deletePayment.pending]:(state)=>{
//             state.pending = true,
//             state.success = false,
//             state.error = false
//         },
//         [deletePayment.success]:(state)=>{
//             toast.warning('Payment deleted')
//             state.pending = false,
//             state.success = true,
//             state.error = false
//         },
//         [deletePayment.rejected]:(state,action)=>{
//             state.pending = false,
//             state.success = false,
//             state.error = true
//             state.msg = action.payload
//         },
        
//     }
// })

// export default  paymentSlice.reducer