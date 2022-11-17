import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
// import { DateSelect } from 'react-ymd-date-select/dist/esm/presets/mui';

import ModalEditProfile from './ModalEditProfile';
import { handleModalEditProfile } from '@/_redux/features/modal/modalSlice';

import styles from './Profile.module.scss';
import ImageCover from '@/components/ImageCover';
const cx = classNames.bind(styles);

const isUser = false;

function Header({ info_data, exeScrollRating }) {
    const dispatch = useDispatch();
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
                        <ImageCover src={info_data.coverImage || ''} alt='' />
                    </div>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar__image')}>
                            <img src={info_data?.avatar || ''} alt='' />
                        </div>
                    </div>

                    <div className={cx('info')}>
                        <div className={cx('info__left')}>
                            <div className={cx('name')}>
                                <span>{info_data?.name}</span>
                                {/* <div className={cx('follow-btn')}>Follow</div> */}
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
                                    <p>{info_data?.follower || 0}</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Has been active</span>
                                    <p>{info_data?.hiredTime} hours</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Completion rate</span>
                                    <p>{info_data?.completeRate}%</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('info__right')}>
                            <div className={cx('services')}>
                                <div className={cx('info__price')}>
                                    Price: <span>${info_data?.fee}</span>
                                </div>
                                <div className={cx('info__rating')}>
                                    <i
                                        className={cx('fa-solid', 'fa-star')}
                                    ></i>
                                    <i
                                        className={cx('fa-solid', 'fa-star')}
                                    ></i>
                                    <i
                                        className={cx('fa-solid', 'fa-star')}
                                    ></i>
                                    <i
                                        className={cx('fa-solid', 'fa-star')}
                                    ></i>
                                    <i
                                        className={cx('fa-solid', 'fa-star')}
                                    ></i>
                                    <span>({info_data?.ratings} ratings)</span>
                                </div>
                            </div>
                            <div className={cx('info__action')}>
                                {isUser ? (
                                    <div
                                        className={cx(
                                            'info__action-btn',
                                            'edit__btn'
                                        )}
                                        onClick={handleOpenModalEditProfile}
                                    >
                                        <i
                                            className={cx('fa-solid fa-pen')}
                                        ></i>
                                        Edit profile
                                    </div>
                                ) : (
                                    <>
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
                                    </>
                                )}
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
            {modal && <ModalEditProfile data={info_data} />}
        </>
    );
}

export default Header;
