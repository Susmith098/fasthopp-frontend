import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../rootstore";
import { boardCreateAxios } from "../../server/Task/BoardCreate";
import { getBoards } from "../../server/Task/GetBoards";



// -----MIDDLEWARES---

// create board
export const createNewBoard = createAsyncThunk('user/createNewBoard', async ({ access, companyName, userId, name, description }) => {
   
    const res = await boardCreateAxios(access, companyName, userId, name, description)
   
    return res
})

// get all board
export const getAllBoards = createAsyncThunk('user/getAllBoards', async ({ access, companyName }) => {
   
    const res = await getBoards(access, companyName)
    return res
})




const boardSlice = createSlice({
    name: 'boards',
    initialState: initialstate.allboards,
    reducers: {
        clearBoard: (state) => {
            return initialstate.allboards;
            
        },
        BoardUpdate: (state, action) => {
            return (
                [...state, action.payload]
            )
        },
        updateBoarddDeletion: (state, action) => {
            console.log(action.payload)
            return state.filter(board => board.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBoards.fulfilled, (state, action) => {
                
                return action.payload
            })
            .addCase(createNewBoard.fulfilled, (state, action) => {
               
                return (
                    [...state, action.payload]
                )
            })
    }
})

export const { clearBoard, BoardUpdate, updateBoarddDeletion } = boardSlice.actions;
export default boardSlice.reducer