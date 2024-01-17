import axios from 'axios'
const API = import.meta.env.VITE_APP_BASE_URL;

// axios call for registering new manager by manager from inside dashboard
export const managerRegister = (name, email, companyName, password, access) => {

    const newuserData = {
        name, email, companyName, password
    };
    
    return axios.post(`${API}/api/manager/create-manager`,
        newuserData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            },
        }
    ).then((response) => {
       console.log(response.data, "from register manager")
        return response.data
    }).catch((error) => {
        if (error.response.data.error) {
            return error.response.data.error
        } else {
            return error
        }

    })

}