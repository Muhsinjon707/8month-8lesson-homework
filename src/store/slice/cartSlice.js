import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        packages: savedCart
    },
    reducers: {
        addToCart: (state, action) => {
            const exist = state.packages.some(item => item.id == action.payload.id);

            if (exist) {
                alert("The product was already added to the Cart");
                return
            }

            state.packages.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.packages))
        },
        removeFromCart: (state, action) => {
            state.packages = state.packages.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.packages))
        },
        clearAll: (state) => {
            state.packages = []
            localStorage.removeItem("cart");
        }
    }
})

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearAll } = cartSlice.actions;