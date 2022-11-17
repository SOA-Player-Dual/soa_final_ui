import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: '',
            auth: {},
        },
        usersPro: [],
    },
    reducers: {
        setUserID: (state, action) => {
            state.user.id = action.payload;
        },
        setUserAuth: (state, action) => {
            state.user.auth = action.payload;
        },
        setProUsers: (state, action) => {
            state.usersPro = action.payload;
        },
    },
});

export const { setProUsers, setUserID, setUserAuth } = userSlice.actions;
export default userSlice.reducer;
