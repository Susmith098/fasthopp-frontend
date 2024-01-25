import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

//axios call for user login 
export const userLogin = (email, password) =>{
    console.log(API)
    return axios.post(`${API}/api/v1/auth/login`, {
        email,
        password
    }).then((response) => {
        // const access = response.data.access;

        return response.data;

    }).catch((error) => {
        error = {'error':'Authentication Failed'}
        return error;
    })
}
