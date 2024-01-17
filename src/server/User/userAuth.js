import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

//axios call for user login 
export const userLogin = (email, password) =>{
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


// get access token from refresh token
// export const userAccess = (refresh) => {
    
//     return axios.post(`${API}/user/access`, { refresh })
//         .then((resposne) => {
//             const access = resposne.data.access
//             const refresh = resposne.data.refresh
//             const authdata = { 'access': access, 'refresh': refresh }
//             return authdata
//         }).catch((error => {
//             error = { 'error': "Unauthorized Access" }
//             return error
//         }))
// }