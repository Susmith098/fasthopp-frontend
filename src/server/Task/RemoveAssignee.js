import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

// remove assignee from card
export const RemoveAssignee = (access, id) => {
    return axios.delete(
        `${API}/task/assignee/${id}`,
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