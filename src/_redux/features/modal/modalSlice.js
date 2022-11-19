import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalType: {
            modalWithdraw: false,
            modalEditProfile: false,
            modalLogin: false,
            modalRegister: false,
        },
    },
    reducers: {
        handleModalWithdraw: (state, action) => {
            state.modalType.modalWithdraw = action.payload;
        },
        handleModalEditProfile: (state, action) => {
            state.modalType.modalEditProfile = action.payload;
        },
        handleModalLogin: (state, action) => {
            state.modalType.modalLogin = action.payload;
        },
        handleModalRegister: (state, action) => {
            state.modalType.modalRegister = action.payload;
        },
    },
});

export const {
    handleModalWithdraw,
    handleModalEditProfile,
    handleModalLogin,
    handleModalRegister,
} = modalSlice.actions;

export default modalSlice.reducer;
