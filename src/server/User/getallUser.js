import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

export const GetalluserDetail = (access) => {
    console.log("from getallUser")
    // console.log(`${API}/api/manager/all-participants`, "path")
    
    return axios.get(`${API}/api/manager/all-participants`, {
        headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response.data, "from get all users")
        return response.data;
    }).catch((error) => {
        console.log(error)
        throw error;
    })
}
