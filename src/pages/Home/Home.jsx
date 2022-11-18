import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import { getAllGames } from '@/api/game_api';
import { getProUsers } from '@/api/user_api';

import { setGames } from '@/_redux/features/games/gamesSlice';
import { setProUsers } from '@/_redux/features/user/userSlice';

import styles from './Home.module.scss';
import GlobalChat from './GlobalChat';
import Sidebar from './Sidebar';
import Content from './Content';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();

    // Get all games
    useEffect(() => {
        const getGameStore = async () => {
            const gameRes = await getAllGames();

            dispatch(setGames(gameRes?.data?.data));
        };

        getGameStore();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Get all users
    useEffect(() => {
        const getProUsersFunc = async () => {
            const userRes = await getProUsers();
            console.log('test user', userRes);
            dispatch(setProUsers(userRes?.user));
        };

        getProUsersFunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
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
    );
}

export default Home;
