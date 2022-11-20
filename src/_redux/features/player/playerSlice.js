import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playersPro: [],
        profile: [],
    },
    reducers: {
        setPlayersPro: (state, action) => {
            state.playersPro = action.payload;
        },
        setProfile: (state, action) => {
            // add user not in the list
            if (
                state.profile.findIndex(
                    (player) => player.urlCode === action.payload.urlCode
                ) === -1
            ) {
                state.profile.push(action.payload);
            }
        },
        updateProfile: (state, action) => {
            console.log('updateProfile', action.payload);
            const playerIndex = state.profile.findIndex(
                (player) => player.urlCode === action.payload.urlCode
            );
            state.profile[playerIndex] = action.payload;
        },
    },
});

export const { setPlayersPro, setProfile, updateProfile } = playerSlice.actions;
export default playerSlice.reducer;
