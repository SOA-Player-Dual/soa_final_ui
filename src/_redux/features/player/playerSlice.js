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

        updatePlayerPro: (state, action) => {
            state.playersPro = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateFollowers: (state, action) => {
            console.log('updateFollowers', action.payload);
            state.profile.player.follower = action.payload;
        },
    },
});

export const {
    setPlayersPro,
    setProfile,
    updatePlayerPro,
    updateProfile,
    updateFollowers,
} = playerSlice.actions;
export default playerSlice.reducer;
