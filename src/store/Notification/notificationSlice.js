import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../rootstore";
import { GettingBroadcastNotification } from "../../server/Notification/BroadcastNotification";

// -----MIDDLEWARES---
// get all notification
export const getBroadcastNotification = createAsyncThunk('user/getBroadcastNotification', ({ access, companyName }) => {
    const response = GettingBroadcastNotification(access, companyName)
    return response
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialstate.notifications,
    reducers: {
        clearNotification: (state) => {
            return initialstate.notifications;
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBroadcastNotification.fulfilled, (state, action) => {
                return {
                    ...state, broadcast: action.payload
                }
            })
    }
})
export const {clearNotification} = notificationSlice.actions
export default notificationSlice.reducer;