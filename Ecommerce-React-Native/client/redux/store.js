import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";

export default configureStore({
    reducer:{
        user:userReducer
    },
})

// host

export const server="http://192.168.29.87:8080/api/v1";