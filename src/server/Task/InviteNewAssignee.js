import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

export const inviteAssignee = (access, selectedEmails, card_id) => {

    console.log(selectedEmails, "selected emails")
    const requestData = {
        cardId: card_id,
        userEmails: selectedEmails
    };
    return axios.post(`${API}/task/assignee/invite`,
        requestData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        console.log(response.data, "response data from assignee axios")
        return response.data
    }).catch((error) => {
        console.log(error, "error from assignee axios")
        return error
    })

}