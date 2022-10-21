import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser2 = createAsyncThunk('users/update',async (user, {rejectWithValue})=>{
    try { 
        const response = await axios.post('https://forextradingarena.herokuapp.com/forexarena/login',
        user);
        localStorage.setItem('user', response.data.id);
        return response.data;
    } catch (error) {
      // return rejectWithValue(error.response.data)  
      return rejectWithValue(error.message)  
    }
});
export const signup = createAsyncThunk('users/signup', async(user, {rejectWithValue})=>{
  try {
    const response = await axios.post('https://forextradingarena.herokuapp.com/forexarena/signup',
    user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const resetpassword = createAsyncThunk('/users/resetpassword', async(user,{rejectWithValue})=>{
try {
  const response = await axios.post('http://localhost:5000/resetpassword',user);
  return response.data;
} catch (error) {
  return rejectWithValue(error.message)
}
});

export const confirmpassword = createAsyncThunk('/users/confirmpassword', async(user, {rejectWithValue})=>{
  try {
    const response = await axios.post('http://localhost:5000/newpassword',user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const newpassword = createAsyncThunk('/users/newpassword', async(email, {rejectWithValue})=>{
  try {
    const response = await axios.post(`http://localhost:5000/newpassword/${email}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getUser = createAsyncThunk('users/getUsers',async(user, {rejectWithValue})=>{
  try {
    const id = localStorage.getItem('user')
    const response = await axios.get('https://forextradingarena.herokuapp.com/forexarena/user/'+id);
    return response.data.user;
  } catch (error) {
     return rejectWithValue(error.response.data)
  }
})
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      email: "",
      phonenumber:'',
      fullname:'',
    },
  
    isLoggedin:false,
    pending: false,
    error: false,
    msg:'',
  },
  reducers: {
   reset:(state)=>{
    state.msg = ''
   }
  },
  extraReducers:{
      [updateUser2.pending]:(state)=>{
        state.pending = true;
        state.error = false;
        state.isLoggedin = false;
      },
      [updateUser2.fulfilled]:(state,action)=>{
        state.pending = false;
        state.msg = action.payload;
        state.isLoggedin = true;
        state.error = false;
      },
      [updateUser2.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.msg = action.payload
        state.isLoggedin = false;
      },
      [signup.pending]:(state)=>{
        state.pending = true;
        state.error = false;
      },
      [signup.fulfilled]:(state,action)=>{
        state.pending = false;
        state.error = false;
        state.msg = action.payload
      },
      [signup.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.msg = action.payload
      },
      [getUser.pending]:(state)=>{
        state.pending = true;
        state.error = false;
      },
      [getUser.fulfilled]:(state,action)=>{
        state.pending = false;
        state.error = false;
        state.userInfo = action.payload;
      },
      [getUser.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.msg = action.payload;
      },
      [resetpassword.pending]:(state)=>{
       state.pending = true;
       state.error = false
      },
      [resetpassword.fulfilled]:(state,action)=>{
        state.pending = false;
        state.error = false;
        state.msg = action.payload;
      },
      [resetpassword.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.msg = action.payload;
      },
      [confirmpassword.pending]:(state)=>{
        state.pending = true;
        state.error = false
       },
       [confirmpassword.fulfilled]:(state,action)=>{
         state.pending = false;
         state.error = false;
         state.userInfo = action.payload;
       },
       [confirmpassword.rejected]:(state,action)=>{
         state.pending = false;
         state.error = true;
         state.msg = action.payload;
       },
      [newpassword.pending]:(state)=>{
        state.pending = true;
        state.error = false
       },
       [newpassword.fulfilled]:(state,action)=>{
         state.pending = false;
         state.error = false;
         state.msg = action.payload;
       },
       [newpassword.rejected]:(state,action)=>{
         state.pending = false;
         state.error = true;
         state.msg = action.payload;
       }
  }
});

// export const {loginStart,loginSuccess,loginFail} = userSlice.actions;
export const { reset } = userSlice.actions;
export default userSlice.reducer;
