import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: '',
            information: {},
            following: {},
            isLogin: false,
        },
    },
    reducers: {
        login: (state, action) => {
            state.user.id = action.payload;
            state.user.isLogin = true;
        },

        setUserInformation: (state, action) => {
            state.user.information = action.payload;
        },

        setFollowing: (state, action) => {
            state.user.following = action.payload;
        },

        updateFollowing: (state, action) => {
            console.log('updateFollowing', action.payload);
            state.user.following.followingData = action.payload;
        },

        logout: (state) => {
            state.user.id = '';
            state.user.information = {};
            state.user.following = {};
            state.user.isLogin = false;
        },
    },
});

export const {
    login,
    setUserInformation,
    logout,
    setFollowing,
    updateFollowing,
} = userSlice.actions;
export default userSlice.reducer;
