import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

// get all columns
export const getColumns = (access, board) => {
    return axios.get( `${API}/task/column/${board}`,
        {
            
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            return error
        })
}