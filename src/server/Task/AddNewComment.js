import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

export const newComment = (access, user_id, user_name, comment, card_id) => {
    console.log(access, user_id, user_name, comment, card_id)
    const requestData = {
        username:user_name,
        userId: user_id,
        comment: comment,
        cardId: card_id
    };
    return axios.post(`${API}/task/comments/card/${card_id}`,
        requestData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((respose) => {
        console.log(respose.data, 'respose from add new comment axios')
        return respose.data
    }).catch((error) => {
        return error
    })

}