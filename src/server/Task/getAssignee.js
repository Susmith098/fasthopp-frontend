import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

// get all assignees
export const getAssignee = (access, card_id) => {
    return axios.get(`${API}/task/assignee/card/${card_id}`,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((resposne) => {
            return resposne.data
        }).catch((error) => {
            return error
        })
}