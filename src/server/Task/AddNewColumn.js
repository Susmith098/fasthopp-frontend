import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_URL;

export const addNewColumn = (access, board, columnTitle, newPosition) => {
    const requestData = {
        columnOrder: newPosition,
        boardId:board,
        name: columnTitle,
    };
    return axios.post(`${API}/task/column/create`,
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