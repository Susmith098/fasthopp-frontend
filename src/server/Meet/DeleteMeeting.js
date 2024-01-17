import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const DeleteMeeting = (access, id) => {
    console.log(access, id, "from delete axios")
    return axios.delete(
        `${API}/task/meeting/delete/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        console.log(response.data, "delete meet axios")
        return response.data
    }).catch((error) => {
        return error
    });
};