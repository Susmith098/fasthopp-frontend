import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./User/authSlice";
import { persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userdataSlice from "./User/userdataSlice";
import userslistSlice from './User/userslistSlice';
import { combineReducers } from "@reduxjs/toolkit";
import BoardSlice from "./Task/BoardSlice";
import ColumnsSlice from "./Task/ColumnsSlice";
import cardSlice from "./Task/cardSlice";
import MeetingSlice from "./Meet/MeetingSlice";
import loadingSlice from "./Loading/loadingSlice";
import notificationSlice from "./Notification/notificationSlice";

const persistConfig = {
    key: 'root',
    storage,
};

// root reducer
const rootReducer = combineReducers({
    usertoken: authSlice,
    userData: userdataSlice,
    users: userslistSlice,
    boards: BoardSlice,
    columns: ColumnsSlice,
    loading: loadingSlice,
    cardData: cardSlice,
    meetingData: MeetingSlice,
    notification: notificationSlice,

});

const persistRootReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});
// persist all data to local storage
const persistor = persistStore(store)

export { store, persistor };