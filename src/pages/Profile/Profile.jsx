import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { getUserByURLCode } from '@/api/user_api';

import styles from './Profile.module.scss';
import Header from './Header';
import BodyContent from './Body';
import rose_cover from '@/assets/images/fake_data/rose_cover.jpg';
import rose_avatar from '@/assets/images/fake_data/rose.jpg';
import lol from '@/assets/icons/lol.jpg';

const cx = classNames.bind(styles);

const fake_data = {
    id: 1,
    name: 'Rose',
    avatar: rose_avatar,
    coverImage: rose_cover,
    gamePlay: [lol, lol, lol, lol, lol, lol, lol, lol, lol],
    follower: 120,
    hasbeenActive: 90,
    competitionRate: 90,
    price: 200,
    ratings: 12,
    gallery_image: [rose_avatar, lol, rose_cover, rose_avatar, lol, rose_cover],
};

// const name = fake_data.name;

function Profile() {
    let { urlCode } = useParams();

    const [profile, setProfile] = useState({});

    // console.log('profile', JSON.parse(`${profile.album}`));

    useEffect(() => {
        const getProfile = async () => {
            const res = await getUserByURLCode(urlCode);

            setProfile(res);
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
