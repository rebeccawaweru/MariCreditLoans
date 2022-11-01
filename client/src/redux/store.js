import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import loanReducer from './loanSlice'
import productReducer from "./productSlice";

export default configureStore({
    reducer:{
        user:userReducer,
        loan:loanReducer,
        product:productReducer,
     
    }
})