import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
// import { DateSelect } from 'react-ymd-date-select/dist/esm/presets/mui';

import followApi from '@/api/followApi';

import { handleModalEditProfile } from '@/_redux/features/modal/modalSlice';

import styles from './Profile.module.scss';
import ImageCover from '@/components/ImageCover';
import Image from '@/components/Image';
const cx = classNames.bind(styles);

function Header({ info_data, exeScrollRating }) {
    const dispatch = useDispatch();

    const storeFollowing = useSelector(
        (state) => state?.user?.user?.following?.followingData
    );

    console.log(
        'hehe',
        storeFollowing.filter((item) => item?.urlCode === info_data?.urlCode)
            .length > 0
    );

    // Check user is following in store

    const handleFollow = () => {
        try {
            const { data } = followApi.post(
                `v1/player/${info_data.id}/follower`
            );
            console.log('Test data follow', data);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            console.log('r324231', error);
        }
    };

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('header__container')}>
                    <div className={cx('cover__photo')}>
                        <ImageCover src={info_data.coverImage || ''} alt='' />
                    </div>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar__image')}>
                            {info_data?.avatar ? (
                                <img src={info_data?.avatar} alt='' />
                            ) : (
                                <Image src={''} alt='' />
                            )}
                        </div>
                    </div>

                    <div className={cx('info')}>
                        <div className={cx('info__left')}>
                            <div className={cx('name')}>
                                <span>{info_data?.nickname}</span>
                                {info_data?.nickname &&
                                    // <div className={cx('follow__btn')}>
                                    //     +&nbsp;Follow
                                    // </div>

                                    // filter user follow
                                    (storeFollowing.filter(
                                        (item) =>
                                            item?.urlCode === info_data?.urlCode
                                    ).length === 0 ? (
                                        <div
                                            className={cx('follow__btn')}
                                            onClick={handleFollow}
                                        >
                                            +&nbsp;Follow
                                        </div>
                                    ) : (
                                        <div className={cx('followed__btn')}>
                                            <i
                                                className={cx(
                                                    'fa-regular fa-check'
                                                )}
                                            ></i>
                                            &nbsp;Followed
                                        </div>
                                    ))}
                            </div>
                            <div className={cx('game__play')}>
                                {info_data?.gamePlay?.map((data, index) => {
                                    return index < 5 ? (
                                        <img key={index} src={data} alt='' />
                                    ) : index === 5 ? (
                                        <div
                                            key={index}
                                            className={cx('game__play-image')}
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${data})`,
                                            }}
                                        >
                                            <i
                                                className={cx(
                                                    'fa-regular',
                                                    'fa-ellipsis'
                                                )}
                                            ></i>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <div className={cx('achie')}>
                                <div className={cx('achie__item')}>
                                    <span>Follower</span>
                                    <p>{info_data?.player?.follower || 0}</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Has been active</span>
                                    <p>{info_data?.player?.hiredTime} hours</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Completion rate</span>
                                    <p>{info_data?.player?.completeRate}%</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('info__right')}>
                            <div className={cx('services')}>
                                <div className={cx('info__price')}>
                                    <span>
                                        {info_data?.player?.fee.toLocaleString()}
                                        &nbsp;VND/hour
                                    </span>
                                </div>
                                <div className={cx('info__rating')}>
                                    <div className={cx('info__rating-star')}>
                                        <StarRatings
                                            rating={info_data?.player?.avgRate}
                                            starRatedColor='#ffcd3c'
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                    </div>
                                    <div>
                                        ({info_data?.player?.avgRate}
                                        &nbsp;ratings)
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info__action')}>
                                <div className={cx('info__action-btn')}>
                                    <i
                                        className={cx(
                                            'fa-solid',
                                            'fa-rectangle-history-circle-user'
                                        )}
                                    ></i>
                                    Rent
                                </div>
                                <div className={cx('info__action-btn')}>
                                    <i
                                        className={cx(
                                            'fa-brands',
                                            'fa-facebook-messenger'
                                        )}
                                    ></i>
                                    Message
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={cx('navigation')}>
                        <div className={cx('navigation__item')}>
                            Introduction
                        </div>
                        <div
                            className={cx('navigation__item')}
                            onClick={exeScrollRating}
                        >
                            Rating
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
