import { Route, useNavigate, Routes } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

import {
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
} from '@/_redux/features/modal/modalSlice';
import Modal from '@/components/Modal';
import login_required from '@/assets/icons/login_required_bg.svg';

// Store

const config = {
    apiKey: 'AIzaSyDnjD8rqgAJHlrwPC-WB4hLygjnOFa4DOA',
    authDomain: 'soa-auth-be6e5.firebaseapp.com',
};
firebase.initializeApp(config);

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // close all modal when reload
    useEffect(() => {
        window.onbeforeunload = () => {
            dispatch(handleModalEditProfile(false));
            dispatch(handleModalLogin(false));
            dispatch(handleModalRegister(false));
            dispatch(handleModalWithdraw(false));
            dispatch(handleModalListFollowing(false));
            dispatch(handleRentModal(false));
            dispatch(handleLoginRequiredModal(false));
            dispatch(handlePostModal(false));
            dispatch(handleChangePassModal(false));
            dispatch(handleForgotPassModal(false));
            dispatch(handleTopupModal(false));
        };

        return () => (window.onbeforeunload = null);
    }, [dispatch]);

    const store = {
        loginRequiredModal: useSelector(
            (state) => state.modal.modalType.loginRequiredModal
        ),
    };
    // Firebase
    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (!user) {
                    console.log('User is not logged in');
                    return;
                }
            });
        return () => unregisterAuthObserver();
    }, []);

    return (
        <div className='App'>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />

            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>

            {store.loginRequiredModal && (
                <Modal
                    title={'Login require'}
                    show={store.loginRequiredModal}
                    close={() => dispatch(handleLoginRequiredModal(false))}
                    size={'medium'}
                >
                    <div className='login-required-container'>
                        <div className='login-require-img'>
                            <img src={login_required} alt='login' />
                        </div>
                        <span className='login-require-tip'>
                            You need login first to use this feature!
                        </span>
                        <div
                            className='login-require-btn'
                            onClick={() => {
                                dispatch(handleLoginRequiredModal(false));
                                navigate('/');
                                dispatch(handleModalLogin(true));
                            }}
                        >
                            Login now!
                        </div>

                        <div
                            className='login-require-close'
                            onClick={() =>
                                dispatch(handleLoginRequiredModal(false))
                            }
                        >
                            Continue as guest
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default App;
