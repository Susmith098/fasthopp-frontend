import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const cardEditUpdate = (access, card_id, updatedData) => {
    console.log(access, card_id, updatedData, "from axios update card");
    return axios.patch(`${API}/task/card/update/${card_id}`, updatedData, {
        headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    });
}