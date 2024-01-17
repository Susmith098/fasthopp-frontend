import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

//get the user details
export const GetuserDetail = (access) => {

    return axios.get(`${API}/api/user/profile`, {
        headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        error = { "error": "no access" }
        return error
    })

}

//update user details
export const changeDetails = (data, access) => {
    
    return axios.patch(`${API}/api/user/update`, data, {
        headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        
        return response.data
    }).catch((error) => {
        
        return error
    })
    

}