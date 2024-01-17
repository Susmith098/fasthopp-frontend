import { createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../rootstore";


const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialstate.isLoading,
    reducers: {
        clearLoading: (state) => {
            return initialstate.isLoading;

        },
        setLoading: (state, action) => {
            return action.payload
        },
    },
})

export const { setLoading, clearLoading } = loadingSlice.actions
export default loadingSlice.reducer