import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Profile.module.scss';
import Modal from '@/components/Modal';
import { handleModalEditProfile } from '@/_redux/features/modal/modalSlice';

const cx = classNames.bind(styles);

const isUser = true;

function Header({ info_data, exeScrollRating }) {
    const dispatch = useDispatch();

    const [nameForm, setNameForm] = useState('false');
    const [avatar, setAvatar] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState(info_data.avatar);

    console.log('avatar: ', avatar);

    const modal = useSelector(
        (state) => state.modal.modalType.modalEditProfile
    );

    const handleOpenModalEditProfile = () => {
        dispatch(handleModalEditProfile(!modal));
    };

    const handleUploadAvatar = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
            setAvatar(e.target.files[0]);
        }
    };

    const handleClicEditNameForm = () => {
        setNameForm((prev) => !prev);
    };

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('header__container')}>
                    <div className={cx('cover__photo')}>
                        <img src={info_data.coverImage} alt='' />
                    </div>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar__image')}>
                            <img src={info_data.avatar} alt='' />
                        </div>
                    </div>

                    <div className={cx('info')}>
                        <div className={cx('info__left')}>
                            <div className={cx('name')}>
                                <span>{info_data.name}</span>
                                {/* <div className={cx('follow-btn')}>Follow</div> */}
                            </div>
                            <div className={cx('game__play')}>
                                {info_data.gamePlay.map((data, index) => {
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
                                    <p>{info_data.follower}</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Has been active</span>
                                    <p>{info_data.hasbeenActive} hours</p>
                                </div>

                                <div className={cx('achie__item')}>
                                    <span>Completion rate</span>
                                    <p>{info_data.competitionRate}%</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('info__right')}>
                            <div className={cx('info__price')}>
                                Price: <span>${info_data.price}</span>
                            </div>
                            <div className={cx('info__rating')}>
                                <i className={cx('fa-solid', 'fa-star')}></i>
                                <i className={cx('fa-solid', 'fa-star')}></i>
                                <i className={cx('fa-solid', 'fa-star')}></i>
                                <i className={cx('fa-solid', 'fa-star')}></i>
                                <i className={cx('fa-solid', 'fa-star')}></i>
                                <span>({info_data.ratings} ratings)</span>
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
            {modal && (
                <Modal
                    title={'Edit profile'}
                    showModal={modal}
                    setShowModal={() => {
                        setNameForm(false);
                        dispatch(handleModalEditProfile(false));
                    }}
                >
                    <div className={cx('edit-profile_modal__wrapper')}>
                        {/* avatar */}
                        <div className={cx('form__group')}>
                            <div className={cx('heading')}>
                                <div className={cx('title')}>
                                    Profile picture
                                </div>
                                <div className={cx('action')}>
                                    <input
                                        type='file'
                                        id='upload-avatar'
                                        hidden
                                        onChange={(e) => handleUploadAvatar(e)}
                                    />
                                    <label htmlFor='upload-avatar'>Edit</label>
                                </div>
                            </div>

                            <div className={cx('content')}>
                                {previewAvatar ? (
                                    <div className={cx('avatar')}>
                                        <img src={previewAvatar} alt='' />
                                    </div>
                                ) : (
                                    <span>No avatar</span>
                                )}
                            </div>
                        </div>

                        {/* name */}
                        <div className={cx('form__group')}>
                            <div className={cx('heading')}>
                                <div className={cx('title')}>Nick name</div>
                                <div
                                    className={cx('action')}
                                    onClick={handleClicEditNameForm}
                                >
                                    {nameForm ? (
                                        <span>Cancel</span>
                                    ) : (
                                        <span>Edit</span>
                                    )}
                                </div>
                            </div>

                            <div className={cx('content')}>
                                {nameForm ? (
                                    <div className={cx('content__edit')}>
                                        <div className={cx('form__input')}>
                                            <input type='text' value={'Rose'} />
                                        </div>
                                        <div className={cx('form__action')}>
                                            <button
                                                onClick={() =>
                                                    setNameForm(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button>Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('display__name')}>
                                        <span>Rose</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Birthday */}
                        <div className={cx('form__group')}>
                            <div className={cx('heading')}>
                                <div className={cx('title')}>Birthday</div>
                                <div className={cx('action')}>
                                    <span>Edit</span>
                                </div>
                            </div>

                            <div className={cx('content')}>
                                <div className={cx('birthday')}>
                                    <i
                                        className={cx(
                                            'fa-light fa-cake-candles'
                                        )}
                                    ></i>
                                    <span>11/03/1992</span>
                                </div>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className={cx('form__group')}>
                            <div className={cx('heading')}>
                                <div className={cx('title')}>Gender</div>
                                <div className={cx('action')}>
                                    <span>Edit</span>
                                </div>
                            </div>

                            <div className={cx('content')}>
                                <div className={cx('birthday')}>
                                    <span>Female</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className={cx('form__group')}>
                            <div className={cx('heading')}>
                                <div className={cx('title')}>Bio</div>
                                <div className={cx('action')}>
                                    <span>Edit</span>
                                </div>
                            </div>

                            <div className={cx('content')}>
                                <div className={cx('bio')}>
                                    <span>Rose love jungjung</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Header;
