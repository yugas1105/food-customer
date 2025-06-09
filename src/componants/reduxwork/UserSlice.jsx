import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    userData: {},
    isLogin: false
}

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, actions) => {
            state.userData = actions.payload;
            state.isLogin = true;
        },
        logoutUser: (state) => {
            state.userData = {};
            state.isLogin = false;
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;