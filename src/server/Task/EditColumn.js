import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const editColumn = (access ,title,  columnid ) => {
    return axios.patch(`${API}/task/column/update/${columnid}`, {
        name: title,
    },
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data, "response from axios")
            return response.data
        }).catch((error) => {
            return error
        })
}