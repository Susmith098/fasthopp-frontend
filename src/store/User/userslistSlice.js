import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { initialstate } from "../rootstore"
import { GetalluserDetail } from "../../server/User/getallUser"

// ---MIDDLEWARE---

// get all user details of users to manager
export const alluserDetails = createAsyncThunk('user/alluserDetails', async ({ access }) => {
    const alluserdetails = await GetalluserDetail(access)
 
    return alluserdetails
})

const userslistSlice = createSlice({
    name: 'userslistdata',
    initialState: initialstate.users,
    reducers: {
        clearUsers: (state) => {
            return initialstate.users;
            
        },
        alluserUpdate: (state, action) => {
            return action.payload
        },
        userBlockUpdate: (state, action) => {
            const isBlocked = action.payload.value === 'Block';
        
            return state.map((user) => {
                if (user.userId === action.payload.id) {
                    return {
                        ...user,
                        blocked: isBlocked,
                    };
                }
                return user;
            });
        },
        addNewUser: (state, action) => {
            return [...state, action.payload]
        }
    },

    extraReducers: (builder) => {
        builder.addCase(alluserDetails.fulfilled, (state, action) => {
            return [...action.payload ]
        })

    }
})

export const { clearUsers, alluserUpdate, addNewUser, userBlockUpdate } = userslistSlice.actions
export default userslistSlice.reducer