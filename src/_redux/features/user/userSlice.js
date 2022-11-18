import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: '',
            information: {},
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

        logout: (state) => {
            state.user.id = '';
            state.user.information = {};
            state.user.isLogin = false;
        },

        setProUsers: (state, action) => {
            state.usersPro = action.payload;
        },
    },
});

export const { login, setUserInformation, logout, setProUsers } =
    userSlice.actions;
export default userSlice.reducer;
