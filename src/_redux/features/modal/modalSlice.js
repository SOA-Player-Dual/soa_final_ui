import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalType: {
            modalWithdraw: false,
            modalEditProfile: false,
            modalLogin: false,
            modalRegister: false,
            modalListFollowing: false,
            rentModal: false,
            loginRequiredModal: false,
            postModal: false,
            changePassModal: false,
            forgotPassModal: false,
            topupModal: false,
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
        handleModalListFollowing: (state, action) => {
            state.modalType.modalListFollowing = action.payload;
        },
        handleRentModal: (state, action) => {
            state.modalType.rentModal = action.payload;
        },
        handleLoginRequiredModal: (state, action) => {
            state.modalType.loginRequiredModal = action.payload;
        },
        handlePostModal: (state, action) => {
            state.modalType.postModal = action.payload;
        },
        handleChangePassModal: (state, action) => {
            state.modalType.changePassModal = action.payload;
        },
        handleForgotPassModal: (state, action) => {
            state.modalType.forgotPassModal = action.payload;
        },
        handleTopupModal: (state, action) => {
            state.modalType.topupModal = action.payload;
        },
    },
});

export const {
    handleModalWithdraw,
    handleModalEditProfile,
    handleModalLogin,
    handleModalRegister,
    handleModalListFollowing,
    handleRentModal,
    handleLoginRequiredModal,
    handlePostModal,
    handleChangePassModal,
    handleForgotPassModal,
    handleTopupModal,
} = modalSlice.actions;

export default modalSlice.reducer;
