import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice'
import userReducer from './UserSlice'

export const MainStore = configureStore({
    reducer:{
        cart: cartReducer,
        user: userReducer
    }
})