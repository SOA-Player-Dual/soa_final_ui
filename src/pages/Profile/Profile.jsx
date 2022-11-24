import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import userApi from '@/api/userApi';

import { setProfile } from '@/_redux/features/player/playerSlice';

import styles from './Profile.module.scss';
import Header from './Header';
import BodyContent from './Body';
import { DynamicTitle } from '@/layouts/DefaultLayout/DynamicTitle/DynamicTitle';

const cx = classNames.bind(styles);

function Profile() {
    let { urlCode } = useParams();
    const dispatch = useDispatch();

    //set title dynamic

    const store = {
        player: useSelector((state) => state?.player?.profile),
    };

    // const isUserInStore = store.player.filter(
    //     (user) => user.urlCode === urlCode
    // );
    DynamicTitle(urlCode);
    useEffect(() => {
        // if (store?.player?.urlCode && store?.player?.urlCode !== urlCode) {
        const getProfile = async () => {
            const { data } = await userApi.get(`v1/user/${urlCode}`);
            dispatch(setProfile(data?.data?.user));
        };
        getProfile();
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlCode]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <BodyContent />
        </div>
    );
}

export default Profile;
