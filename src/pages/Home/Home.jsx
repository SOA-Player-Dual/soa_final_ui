import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import gameApi from '@/api/gameApi';
import userApi from '@/api/userApi';

import { setUserInformation } from '@/_redux/features/user/userSlice';
import { setGames } from '@/_redux/features/games/gamesSlice';
import { setPlayersPro } from '@/_redux/features/player/playerSlice';

import styles from './Home.module.scss';
import GlobalChat from './GlobalChat';
import Sidebar from './Sidebar';
import Content from './Content';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();

    const userID = useSelector((state) => state?.user?.user.id);

    const checkPlayerPro = useSelector((state) => state?.player?.playersPro);
    const checkListGames = useSelector((state) => state?.games?.games);
    const checkUserInformation = useSelector(
        (state) => state?.user?.user?.information
    );

    console.log('checkUserInformation', checkUserInformation);

    console.log(
        'checkPlayerPro',
        Object.getOwnPropertyNames(checkUserInformation).length === 0
    );

    // Get all games
    useEffect(() => {
        const getUserInformation = async () => {
            if (Object.getOwnPropertyNames(checkUserInformation).length === 0) {
                const { data } = await userApi.get(`v1/user/id/${userID}`);
                dispatch(setUserInformation(data?.data?.user));
            }
        };

        const getGameStore = async () => {
            if (!checkListGames.length) {
                const { data } = await gameApi.get('v1/game');
                dispatch(setGames(data?.data?.data));
            }
        };

        const getProUsersFunc = async () => {
            if (!checkPlayerPro.length) {
                const { data } = await userApi.get('v1/player');
                dispatch(setPlayersPro(data?.data?.user));
            }
        };
        getProUsersFunc();
        getGameStore();
        getUserInformation();

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
