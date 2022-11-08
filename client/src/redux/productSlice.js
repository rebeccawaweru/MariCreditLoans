import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../api/client'
import { toast } from "react-toastify";
export const newProduct = createAsyncThunk('/product/newproducts', async(product, {rejectWithValue})=>{
    try {
      const response = await client.post('product',product);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const getProducts = createAsyncThunk('/product/getproducts', async(product, {rejectWithValue})=>{
    try {
      const response = await client.get('product');
      return response.data.product   
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getProduct = createAsyncThunk('/product/getproduct', async(product, {rejectWithValue})=>{
    try {
        const id = localStorage.getItem('product')
      const response = await client.get('product/'+id);
      return response.data.product     
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateProduct = createAsyncThunk('/product/updateproduct', async(product, {rejectWithValue})=>{
    try {
        const id = localStorage.getItem('product')
      const response = await client.patch('product/'+id, product);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteProduct = createAsyncThunk('/product/deleteproduct', async(product, {rejectWithValue})=>{
    try {
      const id = localStorage.getItem('product')
      const response = await client.delete('product/'+id);
      return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const productSlice = createSlice({
    name:"product",
    initialState:{
        productInfo:{
         name:'',
         interest:0,
         addedBy:''
        },
        pending: false,
        success:false,
        error: false,
        msg:'',
        data:[]   
    },
    reducers:{
        reset:(state)=>{
        state.success=false
        state.msg = ''
        }
    },
    extraReducers:{
      [newProduct.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [newProduct.fulfilled]:(state)=>{
        state.success = true;
        toast.success('Product added successfully');
        state.pending = false;
        state.error = false;

      },
      [newProduct.rejected]:(state,action)=>{
        state.success = false
        if(action.payload === 'Request failed with status code 400'){
        toast.error('Loan product already exists')
        }
        state.pending = false;
        state.error = true;
      },
      [getProducts.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [getProducts.fulfilled]:(state,action)=>{
        state.pending = false;
        state.success = true;
        state.error = false;
        state.data = action.payload
      },
      [getProducts.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [getProduct.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [getProduct.fulfilled]:(state,action)=>{
        state.pending = false;
        state.success = true;
        state.error = false;
        state.productInfo = action.payload
      },
      [getProduct.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [updateProduct.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [updateProduct.fulfilled]:(state)=>{
        localStorage.removeItem('product')
        toast.success('Product updated successfully')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [updateProduct.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      [deleteProduct.pending]:(state)=>{
        state.pending = true;
        state.success = false;
        state.error = false;
      },
      [deleteProduct.fulfilled]:(state)=>{
        localStorage.removeItem('product')
        state.pending = false;
        state.success = true;
        state.error = false;
      },
      [deleteProduct.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.success = false
        state.msg = action.payload
      },
      
      
    }
})
export const {reset}  = productSlice.actions
export default productSlice.reducer