import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: '',
            information: {},
            following: {},

            topup: [],
            withdraw: [],
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
        updateGame: (state, action) => {
            state.user.information.get_game = action.payload;
        },
        updateFollowing: (state, action) => {
            state.user.following.followingData = action.payload;
        },
        updateContract: (state, action) => {
            state.user.information.contract = action.payload;
        },
        updatePost: (state, action) => {
            state.user.information.post = action.payload;
        },
        updateBalance: (state, action) => {
            state.user.information.balance = action.payload;
        },
        updateDonateHistory: (state, action) => {
            state.user.information.donate_history = action.payload;
        },
        setTopup: (state, action) => {
            state.user.topup = action.payload;
        },
        setWithdraw: (state, action) => {
            state.user.withdraw = action.payload;
        },
        logout: (state) => {
            state.user.id = '';
            state.user.information = {};
            state.user.following = {};
            state.user.isLogin = false;
            state.user.topup = [];
            state.user.withdraw = [];
        },
    },
});

export const {
    login,
    setUserInformation,
    logout,
    setFollowing,
    updateFollowing,
    updateContract,
    updateGame,
    updatePost,
    updateBalance,
    updateDonateHistory,
    setTopup,
    setWithdraw,
} = userSlice.actions;
export default userSlice.reducer;
