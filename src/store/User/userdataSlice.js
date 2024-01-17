import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../rootstore";
import { GetuserDetail } from "../../server/User/userDetail";

// --MIDDLEWARE---

// get user details while logged in
export const userDetail = createAsyncThunk('user/userDetail', async (access) => {
    const data = await GetuserDetail(access)
    return data
})

const userdataSlice = createSlice({
    name: 'userdata',
    initialState: initialstate.userData,
    reducers: {
        clearUser: (state) => {
            return initialstate.userData;
            
        },
        updateUser: (state, action) => {
            return ({
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                address: action.payload.address,
                designation: action.payload.designation
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userDetail.fulfilled, (state, action) => {
                return { ...action.payload }
            })
    },
});

export const { clearUser, updateUser } = userdataSlice.actions
export default userdataSlice.reducer