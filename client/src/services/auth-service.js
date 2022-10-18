import axios from 'axios'

const API_URL = 'https://forextradingarena.herokuapp.com/forexarena/';

const register = (fullname,email,phonenumber,password)=>{
return axios.post(API_URL+'signup',{
    fullname,email,phonenumber,password
});
};

const login = async (email,password)=>{
    const response = await axios.post(API_URL + 'login', {
        email, password
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {register,login,logout}

export default authService;
