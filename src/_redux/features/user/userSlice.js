import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        usersPro: [],
    },
    reducers: {
        setProUsers: (state, action) => {
            state.usersPro = action.payload;
        },
    },
});

export const { setProUsers } = userSlice.actions;
export default userSlice.reducer;
