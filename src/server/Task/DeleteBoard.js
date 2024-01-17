import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const deleteBoard = (access, id) => {
    return axios.delete(
        `${API}/task/board/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    });
};