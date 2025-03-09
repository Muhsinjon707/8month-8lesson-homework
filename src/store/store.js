import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer, { syncFavoritesWithLocalStorage } from "./slice/favoritesSlice"
import cartReducer from "./slice/cartSlice"

export const store = configureStore({
    reducer: {
        "favorites": favoritesReducer,
        "cart": cartReducer
    }
})

syncFavoritesWithLocalStorage(store);