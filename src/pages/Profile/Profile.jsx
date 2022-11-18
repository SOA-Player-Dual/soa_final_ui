import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import userApi from '@/api/userApi';

import styles from './Profile.module.scss';
import Header from './Header';
import BodyContent from './Body';

const cx = classNames.bind(styles);

function Profile() {
    let { urlCode } = useParams();

    const [profile, setProfile] = useState({});

    // console.log('profile', JSON.parse(`${profile.album}`));

    useEffect(() => {
        const getProfile = async () => {
            const { data } = await userApi.get(`v1/user/${urlCode}`);
            setProfile(data?.data?.user);
        };
        getProfile();
    }, [urlCode]);

    useEffect(() => {
        document.title = `${urlCode}`;

        return () => {};
    }, [urlCode]);

    return (
        <div className={cx('wrapper')}>
            <Header info_data={profile} />
            <BodyContent info_data={profile} />
        </div>
    );
}

export default Profile;
