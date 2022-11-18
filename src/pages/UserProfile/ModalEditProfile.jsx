import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIcon from '@/layouts/LoadingIcon';

import userApi from '@/api/userApi';
import imgbbApi from '@/api/imgbbApi';

import { setUserInformation } from '@/_redux/features/user/userSlice';

import Modal from '@/components/Modal';
import styles from './Profile.module.scss';
import { handleModalEditProfile } from '@/_redux/features/modal/modalSlice';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

function ModalEditProfile() {
    const dispatch = useDispatch();

    const [loadingNickName, setLoadingNickName] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);

    const user = useSelector((state) => state?.user?.user?.information);

    const modal = useSelector(
        (state) => state.modal.modalType.modalEditProfile
    );

    const [nicknameForm, setNicknameForm] = useState(false);
    const [usernameForm, setUsernameForm] = useState(false);
    const [birthdayForm, setBirthdayForm] = useState(false);
    const [genderForm, setGenderForm] = useState(false);
    const [bioForm, setBioForm] = useState(false);

    const [avatar, setAvatar] = useState('');
    const [nickname, setNickname] = useState(user?.nickname);

    console.log('avartar value: ', avatar);
    // const [username, setUsername] = useState('');
    // const [birthday, setBirthday] = useState('');
    // const [gender, setGender] = useState('');
    // const [bio, setBio] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState(user?.avatar);

    const handleUpdateProfile = async () => {
        if (!nickname) {
            toast.error('Nickname is required');
            return;
        }

        try {
            setLoadingNickName(true);
            const { data } = await userApi.put('v1/user', { nickname });
            dispatch(setUserInformation(data?.data?.user));
            toast.success('Update nickname successfully!');
            setLoadingNickName(false);
            setNicknameForm(false);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            setLoadingNickName(false);
        }
    };

    const handleUploadAvatar = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
            setAvatar(e.target.files[0]);
        }
    };

    const handleUpdateAvatar = async () => {
        const formData = new FormData();
        formData.append('image', avatar);
        try {
            setLoadingAvatar(true);
            const res = await imgbbApi.post('upload', formData);
            setLoadingAvatar(false);
            console.log('Avatar imgbb: ', res);
            const { newAvatar } = await userApi.put('v1/user', {
                avatar: res?.data?.data?.display_url,
            });

            console.log('newAvatar: ', newAvatar);
        } catch (error) {
            setLoadingAvatar(false);
            console.log(error);
        }
    };

    const handleClickOpenForm = {
        name: () => {
            setNicknameForm((prev) => !prev);
        },

        username: () => {
            setUsernameForm((prev) => !prev);
        },

        birthday: () => {
            setBirthdayForm((prev) => !prev);
        },

        gender: () => {
            setGenderForm((prev) => !prev);
        },

        bio: () => {
            setBioForm((prev) => !prev);
        },
    };

    return (
        <Modal
            title={'Edit profile'}
            showModal={modal}
            setShowModal={() => {
                setNicknameForm(false);
                setUsernameForm(false);
                setBirthdayForm(false);
                setGenderForm(false);
                setBioForm(false);
                dispatch(handleModalEditProfile(false));
            }}
        >
            <div className={cx('edit-profile_modal__wrapper')}>
                {/* avatar */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Profile picture</div>
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
                            <div className={cx('avatar')}>
                                <Image src={''} alt='' />
                            </div>
                        )}
                        {previewAvatar && (
                            <div
                                className={cx(
                                    'content__edit',
                                    'content__edit-avatar'
                                )}
                            >
                                <div className={cx('form__action')}>
                                    <button
                                        onClick={() => {
                                            setPreviewAvatar(user?.avatar);
                                            setAvatar('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    {loadingAvatar ? (
                                        <LoadingIcon />
                                    ) : (
                                        <button onClick={handleUpdateAvatar}>
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* nickname */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Nick name</div>
                        <div
                            className={cx('action')}
                            onClick={handleClickOpenForm.name}
                        >
                            {nicknameForm ? (
                                <span>Cancel</span>
                            ) : (
                                <span>Edit</span>
                            )}
                        </div>
                    </div>

                    <div className={cx('content')}>
                        {nicknameForm ? (
                            <div className={cx('content__edit')}>
                                <div className={cx('form__input')}>
                                    <input
                                        type='text'
                                        value={nickname}
                                        onChange={(e) =>
                                            setNickname(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={cx('form__action')}>
                                    <button
                                        onClick={() => {
                                            setNicknameForm(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    {loadingNickName ? (
                                        <LoadingIcon />
                                    ) : (
                                        <button onClick={handleUpdateProfile}>
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={cx('display__name')}>
                                <span>{user?.nickname}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* username */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Username</div>
                        <div
                            className={cx('action')}
                            onClick={handleClickOpenForm.username}
                        >
                            {usernameForm ? (
                                <span>Cancel</span>
                            ) : (
                                <span>Edit</span>
                            )}
                        </div>
                    </div>

                    <div className={cx('content')}>
                        {usernameForm ? (
                            <div className={cx('content__edit')}>
                                <div className={cx('form__input')}>
                                    <input type='text' value={'Rose'} />
                                </div>
                                <div className={cx('form__action')}>
                                    <button
                                        onClick={() => setUsernameForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button>Save</button>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('display__name')}>
                                <span>rose.123</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Birthday */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Birthday</div>
                        <div
                            className={cx('action')}
                            onClick={handleClickOpenForm.birthday}
                        >
                            {birthdayForm ? (
                                <span>Cancel</span>
                            ) : (
                                <span>Edit</span>
                            )}
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('birthday')}>
                            {birthdayForm ? (
                                <div className={cx('content__edit')}>
                                    <div className={cx('form__input')}>
                                        <input type='date' />
                                    </div>
                                    <div className={cx('form__action')}>
                                        <button
                                            onClick={() =>
                                                setBirthdayForm(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button>Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <i
                                        className={cx(
                                            'fa-light fa-cake-candles'
                                        )}
                                    ></i>
                                    <span>11/03/1992</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Gender */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Gender</div>
                        <div
                            className={cx('action')}
                            onClick={handleClickOpenForm.gender}
                        >
                            {genderForm ? (
                                <span>Cancel</span>
                            ) : (
                                <span>Edit</span>
                            )}
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('birthday')}>
                            {genderForm ? (
                                <div className={cx('content__edit')}>
                                    <div className={cx('form__input')}>
                                        <input type='text' value={'Female'} />
                                    </div>
                                    <div className={cx('form__action')}>
                                        <button
                                            onClick={() => setGenderForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button>Save</button>
                                    </div>
                                </div>
                            ) : (
                                <span>Female</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Bio</div>
                        <div
                            className={cx('action')}
                            onClick={handleClickOpenForm.bio}
                        >
                            {bioForm ? <span>Cancel</span> : <span>Edit</span>}
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('bio')}>
                            {bioForm ? (
                                <div className={cx('content__edit')}>
                                    <div className={cx('form__input')}>
                                        <input type='text' value={'Female'} />
                                    </div>
                                    <div className={cx('form__action')}>
                                        <button
                                            onClick={() => setBioForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button>Save</button>
                                    </div>
                                </div>
                            ) : (
                                <span>Rose love jungjung</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalEditProfile;
