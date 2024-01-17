import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

// getting all cards
export const getCards = async (access, board) => {
    try {
        const response = await axios.get(`${API}/task/card/cards/${board}`, {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const dragCardUpdate = (destination, draggableId, access) => {

    return axios.patch(`${API}/task/card/update-column/${draggableId}`, null, {
        params: {
            newBoardColumnId: destination
        },
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


// creating a new card
export const cardCreate = (access, id, title, description, maxNum=1, selectedEmails=null, selectedColor, priority) => {
    console.log(access, id, title, description, maxNum, selectedEmails, selectedColor, priority, "from axios get all cars")
    return axios.post(`${API}/task/card/create`, {
        'boardId': id,
        'title': title,
        'description': description,
        'maxMembers': maxNum,
        'assignee': selectedEmails,
        'colour': selectedColor,
        'priority':priority
    },
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data, "from get all card, create new card")
            return response.data
        }).catch((error) => {
            return error
        })
}