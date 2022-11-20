import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// import { DateSelect } from 'react-ymd-date-select/dist/esm/presets/mui';

import followApi from '@/api/followApi';
import userApi from '@/api/userApi';
import contractApi from '@/api/contractApi';

import { setFollowing } from '@/_redux/features/user/userSlice';
import { updateProfile } from '@/_redux/features/player/playerSlice';
import { handleRentModal } from '@/_redux/features/modal/modalSlice';

import styles from './Profile.module.scss';
import ImageCover from '@/components/ImageCover';
import Image from '@/components/Image';
import LoadingIcon from '@/layouts/LoadingIcon';
import Modal from '@/components/Modal';

const cx = classNames.bind(styles);

function Header({ exeScrollRating }) {
    const dispatch = useDispatch();

    let { urlCode } = useParams();

    const store = {
        profile: useSelector((state) => state.player.profile),
        player: useSelector((state) => state?.player?.profile),
        following: useSelector(
            (state) => state?.user?.user?.following?.followingData
        ),
        rentModal: useSelector((state) => state?.modal?.modalType?.rentModal),
        user: useSelector((state) => state?.user?.user?.information),
    };

    const playerData = store?.player?.filter(
        (item) => item?.urlCode === urlCode
    );

    const [time, setTime] = useState('');

    const [pendingBtn, setPendingBtn] = useState(false);

    const [followLoading, setFollowLoading] = useState(false);
    const [unFollowLoading, setUnFollowLoading] = useState(false);
    const [rentLoading, setRentLoading] = useState(false);

    const handleClick = {
        follow: async () => {
            try {
                setFollowLoading(true);
                await followApi.post(`v1/player/${playerData[0]?.id}/follower`);
                const { data } = await userApi.get(`v1/user/following`);
                const newInfo = await userApi.get(`v1/user/${urlCode}`);
                console.log('Check newInfo', newInfo);
                dispatch(updateProfile(newInfo?.data?.data?.user));
                dispatch(setFollowing(data?.data));
                setFollowLoading(false);
            } catch (error) {
                toast.error(error?.response?.data?.error);
                setFollowLoading(false);
            }
        },
        unfollow: async () => {
            try {
                setUnFollowLoading(true);
                await followApi.put(`v1/player/${playerData[0]?.id}/follower`);
                const { data } = await userApi.get(`v1/user/following`);
                const newInfo = await userApi.get(`v1/user/${urlCode}`);

                console.log('Test data', data?.data);
                dispatch(updateProfile(newInfo?.data?.data?.user));
                dispatch(setFollowing(data?.data));
                setUnFollowLoading(false);
            } catch (error) {
                toast.error(error?.response?.data?.error);
                setUnFollowLoading(false);
            }
        },
        rentModal: () => {
            dispatch(handleRentModal(true));
        },
        rent: () => {
            if (store?.user?.balance < playerData[0]?.player?.fee) {
                toast.error('Your balance is not enough, please top up!');
                return;
            }
            try {
                setRentLoading(true);
                const { data } = contractApi.post(`v1/contract`, {
                    player: playerData[0]?.id,
                    time,
                });
                console.log('Rent data', data);
                setRentLoading(false);
            } catch (error) {
                toast.error(error?.response?.data?.error);
                setRentLoading(false);
            }
        },
    };

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('header__container')}>
                    <div className={cx('cover__photo')}>
                        <ImageCover
                            src={playerData[0]?.coverImage || ''}
                            alt=''
                        />
                    </div>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar__image')}>
                            {playerData[0]?.avatar ? (
                                <img src={playerData[0]?.avatar} alt='' />
                            ) : (
                                <Image src={''} alt='' />
                            )}
                        </div>
                    </div>

                    <div className={cx('info')}>
                        <div className={cx('info__left')}>
                            <div className={cx('name')}>
                                <div className={cx('name__wrapper')}>
                                    {playerData[0]?.nickname}
                                </div>

                                <div className={cx('follow')}>
                                    {followLoading || unFollowLoading ? (
                                        <LoadingIcon />
                                    ) : (
                                        playerData[0]?.nickname &&
                                        (store.following ? (
                                            store.following?.filter(
                                                (item) =>
                                                    item?.urlCode ===
                                                    playerData[0]?.urlCode
                                            ).length === 0 ? (
                                                <div
                                                    className={cx(
                                                        'follow__btn'
                                                    )}
                                                    onClick={handleClick.follow}
                                                >
                                                    +&nbsp;Follow
                                                </div>
                                            ) : (
                                                <div
                                                    className={cx(
                                                        'followed__btn'
                                                    )}
                                                    onClick={
                                                        handleClick.unfollow
                                                    }
                                                >
                                                    <i
                                                        className={cx(
                                                            'fa-regular fa-check'
                                                        )}
                                                    ></i>
                                                    &nbsp;Followed
                                                </div>
                                            )
                                        ) : null)
                                    )}
                                </div>
                            </div>
                            <div className={cx('game__play')}>
                                {playerData[0]?.gamePlay?.map((data, index) => {
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
                                    <p>
                                        {playerData[0]?.player?.follower || 0}
                                    </p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Has been active</span>
                                    <p>
                                        {playerData[0]?.player?.hiredTime} hours
                                    </p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Completion rate</span>
                                    <p>
                                        {playerData[0]?.player?.completeRate}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('info__right')}>
                            <div className={cx('services')}>
                                <div className={cx('info__price')}>
                                    <span>
                                        {playerData[0]?.player?.fee.toLocaleString()}
                                        &nbsp;VND/hour
                                    </span>
                                </div>
                                <div className={cx('info__rating')}>
                                    <div className={cx('info__rating-star')}>
                                        <StarRatings
                                            rating={
                                                playerData[0]?.player?.avgRate
                                            }
                                            starRatedColor='#ffcd3c'
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                    </div>
                                    <div>
                                        ({playerData[0]?.player?.avgRate}
                                        &nbsp;ratings)
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info__action')}>
                                <div
                                    className={cx(
                                        'info__action-btn',
                                        'donate__btn'
                                    )}
                                >
                                    <i
                                        className={cx(
                                            'fa-regular fa-circle-dollar-to-slot'
                                        )}
                                    ></i>
                                    Donate
                                </div>
                                <div
                                    className={cx('info__action-btn')}
                                    onClick={handleClick.rentModal}
                                >
                                    <i
                                        className={cx(
                                            'fa-solid',
                                            'fa-rectangle-history-circle-user'
                                        )}
                                    ></i>
                                    Rent
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

            {store.rentModal && (
                <Modal
                    title='Rent player'
                    show={store.rentModal}
                    close={() => dispatch(handleRentModal(false))}
                    size={'small'}
                >
                    <div className={cx('rent__modal')}>
                        <div className={cx('user')}>
                            <div className={cx('user__avatar')}>
                                <img src={playerData[0]?.avatar} alt='avatar' />
                            </div>
                            <div className={cx('user__name')}>
                                {playerData[0]?.nickname}
                            </div>
                        </div>
                        <div className={cx('rent__item')}>
                            <div className={cx('rent__item-title')}>
                                Time to rent
                            </div>
                            <div className={cx('rent__item-content')}>
                                <select
                                    value={time}
                                    className={cx('form-control')}
                                    onChange={(e) => setTime(e.target.value)}
                                >
                                    <option value='1'>1 hour</option>
                                    <option value='2'>2 hours</option>
                                    <option value='3'>3 hours</option>
                                    <option value='4'>4 hours</option>
                                    <option value='5'>5 hours</option>
                                    <option value='6'>6 hours</option>
                                    <option value='7'>7 hours</option>
                                    <option value='8'>8 hours</option>
                                    <option value='9'>9 hours</option>
                                    <option value='10'>10 hours</option>
                                    <option value='11'>20 hours</option>
                                    <option value='12'>24 hours</option>
                                </select>
                            </div>
                        </div>

                        <div className={cx('rent__item')}>
                            <div className={cx('rent__item-title')}>Cost</div>
                            <div className={cx('rent__item-content')}>
                                <span>
                                    {playerData[0]?.player?.fee?.toLocaleString()}
                                    &nbsp;VND
                                </span>
                            </div>
                        </div>

                        <div className={cx('rent__item')}>
                            <div className={cx('rent__item-title')}>
                                Your balance
                            </div>
                            <div className={cx('rent__item-content')}>
                                {store?.user?.balance <
                                    playerData[0]?.player?.fee && (
                                    <div className={cx('top__up-btn')}>
                                        <i
                                            className={cx(
                                                'fa-regular fa-circle-plus'
                                            )}
                                        ></i>
                                    </div>
                                )}
                                <span
                                    className={cx(
                                        store?.user?.balance >=
                                            playerData[0]?.player?.fee
                                            ? 'user__money'
                                            : 'user__money-not-enough'
                                    )}
                                >
                                    {store?.user?.balance?.toLocaleString()}
                                    &nbsp;VND
                                </span>
                            </div>
                        </div>

                        <div className={cx('form__action')}>
                            <button
                                className={cx('form__btn-close')}
                                onClick={() => dispatch(handleRentModal(false))}
                            >
                                Close
                            </button>

                            <div className={cx('form__btn-primary')}>
                                <button onClick={handleClick.rent}>Rent</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Header;
