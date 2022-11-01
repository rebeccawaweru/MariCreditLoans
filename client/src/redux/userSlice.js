import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import client from "../api/client";


export const updateUser2 = createAsyncThunk('users/update',async (user, {rejectWithValue})=>{
    try { 
        const response = await client.post('login',
        user);
        localStorage.setItem('user', response.data);
        return response.data;
    } catch (error) {
      // return rejectWithValue(error.response.data)  
      return rejectWithValue(error.message)  
    }
});
export const signup = createAsyncThunk('users/signup', async(user, {rejectWithValue})=>{
  try {
    const response = await client.post('newuser',
    user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const resetpassword = createAsyncThunk('/users/resetpassword', async(user,{rejectWithValue})=>{
try {
  const response = await client.post('resetpassword',user);
  return response.data;
} catch (error) {
  return rejectWithValue(error.message)
}
});

export const confirmpassword = createAsyncThunk('/users/confirmpassword', async(user, {rejectWithValue})=>{
  try {
    const response = await client.post('confirmpassword',user);
    localStorage.setItem('email', response.data.user.email);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const newpassword = createAsyncThunk('/users/newpassword', async(user,{rejectWithValue})=>{
  try {
    const email = localStorage.getItem('email');
    const response = await client.post(`newpassword/${email}`, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getUser = createAsyncThunk('users/getUser',async(user,{rejectWithValue})=>{
  try {
    const id = localStorage.getItem('user')
    const response = await client.get('user/'+id);
    return response.data.user;
  } catch (error) {
     return rejectWithValue(error.message)
  }
})

export const getUsers = createAsyncThunk('users/getUsers',async(user, {rejectWithValue})=>{
  try {
    const response = await client.get('users');
    return response.data.user
  } catch (error) {
    return rejectWithValue(error.message)
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
    data:[]
  },
  reducers: {
   reset:(state)=>{
    state.msg = ''
   },
   logout:(state)=>{
    state.isLoggedin = false;
    state.userInfo = {};
    localStorage.removeItem('user')
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
        state.isLoggedin = true;
      },
      [getUser.rejected]:(state,action)=>{
        state.pending = false;
        state.error = true;
        state.msg = action.payload;
      },
      [getUsers.pending]:(state)=>{
        state.pending = true;
        state.error = false;
      },
      [getUsers.fulfilled]:(state,action)=>{
        state.pending = false;
        state.error = false;
        state.data = action.payload;
      },
      [getUsers.rejected]:(state,action)=>{
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
       [confirmpassword.fulfilled]:(state)=>{
         state.pending = false;
         state.error = false;
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
          localStorage.removeItem('email');
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
export const { reset,logout } = userSlice.actions;
export default userSlice.reducer;
