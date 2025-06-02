import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartItem: [],
    cartTotal: 0,
}

let cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, actions) => {
            let newItem = { ...actions.payload, Qty: 1 }
            state.cartItem = [...state.cartItem, newItem]
            state.itemCount = state.cartItem.length
        }
    }
})


export const { addItem } = cartSlice.actions
export default cartSlice.reducer