import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import gameApi from '@/api/gameApi';
import userApi from '@/api/userApi';

import {
    setUserInformation,
    setFollowing,
} from '@/_redux/features/user/userSlice';
import { setGames } from '@/_redux/features/games/gamesSlice';
import { setPlayersPro } from '@/_redux/features/player/playerSlice';
import {
    handleModalLogin,
    handleModalRegister,
} from '@/_redux/features/modal/modalSlice';

import styles from './Home.module.scss';
import GlobalChat from './GlobalChat';
// import Modal from '@/components/Modal';
import Sidebar from './Sidebar';
// import SignIn from '@/pages/Auth/SignIn';
// import SignUp from '@/pages/Auth/SignUp';
import Content from './Content';
import { DynamicTitle } from '@/layouts/DefaultLayout/DynamicTitle/DynamicTitle';

import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Modal from '@/components/Modal';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    DynamicTitle('PlayerDual');

    const userID = useSelector((state) => state?.user?.user.id);

    const checkPlayerPro = useSelector((state) => state?.player?.playersPro);
    const checkListGames = useSelector((state) => state?.games?.games);
    const checkListFollowing = useSelector(
        (state) => state?.user?.user?.following
    );
    const checkUserInformation = useSelector(
        (state) => state?.user?.user?.information
    );
    const checkUser = useSelector((state) => state?.user?.user?.isLogin);

    // Reset modal
    useEffect(() => {
        window.onbeforeunload = () => {
            dispatch(handleModalLogin(false));
            dispatch(handleModalRegister(false));
        };
        return () => {
            window.onbeforeunload = null;
        };
    }, [dispatch]);

    // Get all games
    useEffect(() => {
        if (checkUser) {
            const getUserInformation = async () => {
                if (
                    checkUserInformation &&
                    Object.getOwnPropertyNames(checkUserInformation).length ===
                        0 &&
                    checkUser
                ) {
                    const { data } = await userApi.get(`v1/user/id/${userID}`);
                    dispatch(setUserInformation(data?.data?.user));
                }
            };

            const getFollowing = async () => {
                if (
                    checkListFollowing &&
                    Object.getOwnPropertyNames(checkListFollowing).length ===
                        0 &&
                    checkUser
                ) {
                    const { data } = await userApi.get(`v1/user/following`);
                    dispatch(setFollowing(data?.data));
                }
            };

            getUserInformation();
            getFollowing();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkUser]);

    useEffect(() => {
        const getProUsersFunc = async () => {
            if (!checkPlayerPro.length) {
                const { data } = await userApi.get('v1/player');
                dispatch(setPlayersPro(data?.data?.user));
            }
        };
        getProUsersFunc();

        const getGameStore = async () => {
            if (!checkListGames.length) {
                const { data } = await gameApi.get('v1/game');
                dispatch(setGames(data?.data?.data));
            }
        };

        getGameStore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const modalLogin = useSelector(
        (state) => state?.modal?.modalType?.modalLogin
    );
    const modalRegister = useSelector(
        (state) => state?.modal?.modalType?.modalRegister
    );

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('global-chat')}>
                    <GlobalChat />
                </div>
                <div className={cx('side-bar')}>
                    <Sidebar />
                </div>
                <div className={cx('container')}>
                    <Content />
                </div>
            </div>

            {modalLogin && (
                <Modal
                    title='Login'
                    show={modalLogin}
                    notCloseOutside={true}
                    close={() => dispatch(handleModalLogin(false))}
                    size={'large'}
                >
                    <>
                        {/* click to swap sign in adn sign up */}

                        <SignIn />
                    </>
                </Modal>
            )}

            {modalRegister && (
                <Modal
                    title='Register'
                    notCloseOutside={true}
                    show={modalRegister}
                    close={() => dispatch(handleModalRegister(false))}
                    size={'large'}
                >
                    <>
                        {/* click to swap sign in adn sign up */}
                        <SignUp />
                    </>
                </Modal>
            )}
        </>
    );
}

export default Home;
