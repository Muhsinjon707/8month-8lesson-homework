import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favoritesList: savedFavorites
    },
    reducers: {
        addItem: (state, action) => {
            const isInList = state.favoritesList.some(item => item.id === action.payload.id);

            if (!isInList) {
                state.favoritesList = [...state.favoritesList, action.payload]; 
            }
        },
        removeItem: (state, action) => {
            state.favoritesList = state.favoritesList.filter(item => item.id !== action.payload);
        },
        clearAll: (state) => {
            state.favoritesList = [];
        }
    }
});

export const syncFavoritesWithLocalStorage = (store) => {
    store.subscribe(() => {
        const { favorites } = store.getState();
        localStorage.setItem("favorites", JSON.stringify(favorites.favoritesList));
    });
};

export default favoritesSlice.reducer;
export const { addItem, removeItem, clearAll } = favoritesSlice.actions;
