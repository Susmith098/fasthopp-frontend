import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../rootstore";
import { getColumns } from "../../server/Task/GetColumns";
import { addNewColumn } from "../../server/Task/AddNewColumn";


// -----MIDDLEWARES---

// get all columns
export const getAllColumns = createAsyncThunk('user/getAllColumns', async ({ access, board }) => {
    const response = await getColumns(access, board)
    return response
})

// add a new columns
export const addingColumns = createAsyncThunk('user/addingColumns', async ({ access, board, columnTitle, newPosition}) => {
    const response = await addNewColumn(access, board, columnTitle, newPosition)
    return response
})


const columnsSlice = createSlice({
    name: 'columns',
    initialState: initialstate.columns,
    reducers: {
        clearColumns: (state) => {
            return initialstate.columns;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllColumns.fulfilled, (state, action) => {
                return action.payload
                
            })
            .addCase(addingColumns.fulfilled, (state, action) => {
                return (
                    [...state, action.payload]
                )
            })
            
    }
})

export const { clearColumns } = columnsSlice.actions
export default columnsSlice.reducer;