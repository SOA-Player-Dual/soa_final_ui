import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';

import ModalEditProfile from './ModalEditProfile';
import { handleModalEditProfile } from '@/_redux/features/modal/modalSlice';

import styles from './Profile.module.scss';
import Image from '@/components/Image';
import ImageCover from '@/components/ImageCover';
const cx = classNames.bind(styles);

function Header({ exeScrollRating }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user?.user?.information);
    const modal = useSelector(
        (state) => state.modal.modalType.modalEditProfile
    );

    const handleOpenModalEditProfile = () => {
        dispatch(handleModalEditProfile(!modal));
    };

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('header__container')}>
                    <div className={cx('cover__photo')}>
                        <ImageCover src={user.coverImage || ''} alt='' />
                    </div>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar__image')}>
                            {user?.avatar.length > 0 ? (
                                <img src={user?.avatar} alt='avatar' />
                            ) : (
                                <Image src='' alt='avatar' />
                            )}
                        </div>
                    </div>

                    <div className={cx('info')}>
                        <div className={cx('info__left')}>
                            <div className={cx('name')}>
                                <span>{user?.nickname}</span>
                            </div>
                            <div className={cx('game__play')}>
                                {user?.gamePlay?.map((data, index) => {
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
                                    <p>{user?.player?.follower}</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Has been active</span>
                                    <p>{user?.player?.hiredTime} hours</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Completion rate</span>
                                    <p>{user?.player?.completeRate}%</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('info__right')}>
                            <div className={cx('services')}>
                                <div className={cx('info__price')}>
                                    <span>
                                        {user?.player?.fee.toLocaleString()}
                                        &nbsp;VND/hour
                                    </span>
                                </div>
                                <div className={cx('info__rating')}>
                                    <div className={cx('info__rating-star')}>
                                        <StarRatings
                                            rating={user?.player?.avgRate}
                                            starRatedColor='#ffcd3c'
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                    </div>
                                    <div>
                                        ({user?.player?.avgRate}
                                        &nbsp;ratings)
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info__action')}>
                                <div
                                    className={cx(
                                        'info__action-btn',
                                        'edit__btn'
                                    )}
                                    onClick={handleOpenModalEditProfile}
                                >
                                    <i className={cx('fa-solid fa-pen')}></i>
                                    Edit profile
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
            {modal && <ModalEditProfile data={user} />}
        </>
    );
}

export default Header;
