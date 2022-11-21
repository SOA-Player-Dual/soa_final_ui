import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playersPro: [],
        profile: {},
    },
    reducers: {
        setPlayersPro: (state, action) => {
            state.playersPro = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
});

export const { setPlayersPro, setProfile, updateProfile } = playerSlice.actions;
export default playerSlice.reducer;
