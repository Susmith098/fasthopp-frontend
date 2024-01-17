import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

// create board
export const boardCreateAxios = (access, companyName, userId, name, description) => {

    const requestData = {
        companyName: companyName,
        userId: userId,
        name: name,
        description: description,
    };
   
    return axios.post(`${API}/task/board/create`,
        requestData,
        {
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