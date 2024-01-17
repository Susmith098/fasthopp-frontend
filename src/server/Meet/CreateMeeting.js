import axios from 'axios';
const API = import.meta.env.VITE_APP_BASE_URL;

export const createMeetAxios = (access, id, companyName, roomID, description, starting_time, duration) => {

    // Convert the starting_time to a Date object
    const startingTimeDate = new Date(starting_time * 1000);
    
    // Convert duration to milliseconds and add it to starting_time
    const expirationTimeDate = new Date(startingTimeDate.getTime() + duration * 60 * 1000);


    const requestData = {
        "organizerId":id,
        'companyName':companyName,
        'roomId':roomID, 
        'description': description, 
        'startingTime': startingTimeDate.toISOString(), 
        'expirationTime': expirationTimeDate.toISOString(),
        
    };
    console.log(requestData, "from meet server")
    return axios.post(`${API}/task/meeting/create`,
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