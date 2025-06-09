import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartItem: [],
    cartTotal: 0,
    itemCount: 0
}

let cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, actions) => {
            let newItem = { ...actions.payload, Qty: 1 }
            state.cartItem = [...state.cartItem, newItem]
            state.itemCount = state.cartItem.length
        },
        increQty: (state, actions) => {
            let dishItem = state.cartItem.find((itm) => itm._id == actions.payload.dId);
            dishItem.Qty += 1
        },
        decreQty: (state, actions) => {
            let dishItem = state.cartItem.find((itm) => itm._id == actions.payload.dId);
            dishItem.Qty -= 1

            if(dishItem.Qty == 0){
                state.cartItem = state.cartItem.filter((item) => item._id != actions.payload.dId)
                state.itemCount = state.cartItem.length
            }
        },
        calculateTotal: (state, actions) => {
            let total = 0
            for (const item of state.cartItem) {
                total += item.price * item.Qty
            }
            state.cartTotal = total
        },
        removeItem: (state, actions) => {
            state.cartItem = state.cartItem.filter((item) => item._id !== actions.payload.dId);
            state.itemCount = state.cartItem.length
        }
    }
})


export const { addItem, increQty, decreQty, calculateTotal, removeItem } = cartSlice.actions
export default cartSlice.reducer