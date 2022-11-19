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
        usersPro: [],
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

        logout: (state) => {
            state.user.id = '';
            state.user.information = {};
            state.user.following = {};
            state.user.isLogin = false;
        },

        setProUsers: (state, action) => {
            state.usersPro = action.payload;
        },
    },
});

export const { login, setUserInformation, logout, setProUsers, setFollowing } =
    userSlice.actions;
export default userSlice.reducer;
