import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { initialstate } from "../rootstore";
// import { userAccess } from "../server/userAuth";
import { userLogin } from "../../server/User/userAuth";

// -----MIDDLEWARES---

// user
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
    const authdata = await userLogin(email, password);
    return authdata
});

// get access from refresh
export const GetAccess = createAsyncThunk('user/GetAccess', async ({ refresh }) => {
    const authdata = await userAccess(refresh)
    return authdata
})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialstate.usertoken,
    reducers: {
        Logout: (state) => {
            return initialstate;
        },
        Success: (state, action) => {
            return {
                ...state,
                registerSuccess: action.payload
            }
        },
        SuccessRegister: (state, action) => {
            return {
                ...state,
                
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {

                if (!action.payload.error) {
                    return {
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        is_authenticated: true,
                        registerSuccess: null,
                        user:action.payload.user
                    };
                }
            })
            .addCase(GetAccess.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        is_authenticated: true,
                        registerSuccess: null,
                    }
                }
            })
    }

});

export const { Logout, Success, SuccessRegister } = authSlice.actions;
export default authSlice.reducer