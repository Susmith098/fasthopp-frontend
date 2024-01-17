import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

// get all notification
export const GettingBroadcastNotification = (access, work) => {
    return axios.get(`${API}/notification/messages`,
        {
            params: {
                companyName: work
            },
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            }
        }
    ).then((response) => {
        console.log(response.data, "response data from axios notification")
        return response.data
    }).catch((error) => {
        return error
    })

}