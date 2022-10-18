import { REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,SET_MESSAGE } from "./types";
import authService from "../services/auth-service";

export const register = (fullname,email,phonenumber,password)=>(dispatch)=>{
return authService.register(fullname,email,phonenumber,password).then((response)=>{
    dispatch({
    type: REGISTER_SUCCESS
    });
    return Promise.resolve()
    },
    (error)=>{
    const message = error.message
    dispatch({
        type:REGISTER_FAIL,
    });
    dispatch({
        type:SET_MESSAGE,
        payload:message
    });
    return Promise.reject();
    }
)};

export const login = (email,password)=>(dispatch)=>{
return authService.login(email,password).then((response)=>{
    dispatch({
        type:LOGIN_SUCCESS,
        payload:{user:response},
    });
    return Promise.resolve();
   },
   (error)=>{
    const message = error.message
    dispatch({
        type:LOGIN_FAIL
    });
    dispatch({
        type:SET_MESSAGE,
        payload:message
    });
    return Promise.reject();
   }
   )
}

export const logout = ()=>(dispatch)=>{
    authService.logout();

    dispatch({
    type:LOGOUT,
    });
};

