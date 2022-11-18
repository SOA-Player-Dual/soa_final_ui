import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playersPro: [],
    },
    reducers: {
        setPlayersPro: (state, action) => {
            state.playersPro = action.payload;
        },
    },
});

export const { setPlayersPro } = playerSlice.actions;
export default playerSlice.reducer;
