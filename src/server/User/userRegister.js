import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

// axios call for registering new user from outside
export const userRegister = (name, email, companyName, password, access) => {

    const newuserData = {
        name, email, companyName, password
    };
    
    return axios.post(`${API}/api/manager/create-user`,
        newuserData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            },
        }
    ).then((response) => {
       console.log(response.data, "from register user")
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}