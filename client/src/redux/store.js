import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import loanReducer from './loanSlice'
import productReducer from "./productSlice";
import paymentReducer from './paymentSlice'
export default configureStore({
    reducer:{
        user:userReducer,
        loan:loanReducer,
        product:productReducer,
        payment:paymentReducer,
    }
})