import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const getBoards = (access, companyName) => {
    
    return axios.get(`${API}/task/board/all-boards`,
        {
            params: {
                companyName: companyName
            },
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((respose) => {
        return respose.data
    }).catch((error) => {
        return error
    })
}