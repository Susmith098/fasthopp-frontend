import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

// axios call for registering new user by manager from inside dashboard
export const newUserRegister = (
    name, email, companyName, password
) => {

    const newuserData = {
        name, email, companyName, password
    };
    
    console.log("user register");
    const headers = { 'Content-Type': 'application/json' };
    return axios.post(`${API}/api/v1/auth/register-manager`,
        newuserData,
        headers
    ).then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}