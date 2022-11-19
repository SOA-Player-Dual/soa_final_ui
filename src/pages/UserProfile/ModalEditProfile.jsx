import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

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

    const user = useSelector((state) => state?.user?.user?.information);

    const modal = useSelector(
        (state) => state.modal.modalType.modalEditProfile
    );

    // turn off modal when reload page
    useEffect(() => {
        window.onbeforeunload = () => {
            dispatch(handleModalEditProfile(false));
        };

        return () => (window.onbeforeunload = null);
    }, [dispatch]);

    const [loadingNickName, setLoadingNickName] = useState(false);
    const [loadingUrlCode, setLoadingUrlCode] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [loadingDateOfBirth, setLoadingDateOfBirth] = useState(false);
    const [loadingGender, setLoadingGender] = useState(false);

    const [nicknameForm, setNicknameForm] = useState(false);
    const [usernameForm, setUsernameForm] = useState(false);
    const [birthdayForm, setBirthdayForm] = useState(false);
    const [genderForm, setGenderForm] = useState(false);
    const [bioForm, setBioForm] = useState(false);

    const [avatar, setAvatar] = useState('');
    const [urlCode, setUrlCode] = useState(user?.urlCode);
    const [nickname, setNickname] = useState(user?.nickname);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [gender, setGender] = useState(user?.gender);

    //
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

            const { data } = await userApi.put('v1/user', {
                avatar: res?.data?.data?.display_url,
            });

            dispatch(setUserInformation(data?.data?.user));
            setLoadingAvatar(false);
            setAvatar('');
            setPreviewAvatar(data?.data?.user?.avatar);

            toast.success('Update avatar successfully!');
        } catch (error) {
            setLoadingAvatar(false);
            toast.error(error?.response?.data?.error);
        }
    };

    const handleUpdateUrlCode = async () => {
        if (!urlCode) {
            toast.error('Url code is required!');
            return;
        }

        try {
            setLoadingUrlCode(true);
            const { data } = await userApi.put('v1/user', { urlCode });
            dispatch(setUserInformation(data?.data?.user));

            toast.success('Update url code successfully!');
            setLoadingUrlCode(false);
            setUsernameForm(false);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            setLoadingUrlCode(false);
        }
    };

    const handleUpdateGender = async () => {
        try {
            const { data } = await userApi.post('v1/user', { gender });
            dispatch(setUserInformation(data?.data?.user));

            toast.success('Update gender successfully!');
            setLoadingGender(false);
            setGenderForm(false);
        } catch (e) {
            toast.error(e?.response?.data?.error);
            setLoadingGender(false);
        }
    };

    const handleUpdateDateOfBirth = async () => {
        if (!dateOfBirth) {
            toast.error('Date of birth is required!');
            return;
        }

        try {
            setLoadingDateOfBirth(true);
            const { data } = await userApi.put('v1/user', { dateOfBirth });
            dispatch(setUserInformation(data?.data?.user));
            toast.success('Update date of birth successfully!');
            setLoadingDateOfBirth(false);
            setBirthdayForm(false);
        } catch (error) {
            toast.error(error?.response?.data?.error);
            setLoadingDateOfBirth(false);
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
            size={'large'}
            show={modal}
            close={() => {
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
                        <input
                            type='file'
                            id='upload-avatar'
                            hidden
                            onChange={(e) => handleUploadAvatar(e)}
                        />
                        <label htmlFor='upload-avatar'>Edit</label>
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
                        {avatar && (
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
                        {!loadingNickName && (
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
                        )}
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

                {/* url code */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>URL code</div>
                        {!loadingUrlCode && (
                            <div
                                className={cx('action')}
                                onClick={handleClickOpenForm.username}
                            >
                                {usernameForm ? (
                                    <span>Cancel</span>
                                ) : (
                                    <span
                                        onClick={() =>
                                            setUrlCode(user?.urlCode)
                                        }
                                    >
                                        Edit
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={cx('content')}>
                        {usernameForm ? (
                            <div className={cx('content__edit')}>
                                <div className={cx('form__input')}>
                                    <input
                                        type='text'
                                        value={urlCode}
                                        onChange={(e) =>
                                            setUrlCode(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={cx('form__action')}>
                                    <button
                                        onClick={() => {
                                            setUsernameForm(false);
                                            setUrlCode(user?.urlCode);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    {loadingUrlCode ? (
                                        <LoadingIcon />
                                    ) : (
                                        <button onClick={handleUpdateUrlCode}>
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={cx('display__name')}>
                                <span>
                                    https://soa-playerdual.herokuapp.com/
                                    {user?.urlCode}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Birthday */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Birthday</div>
                        {!loadingDateOfBirth && (
                            <div
                                className={cx('action')}
                                onClick={handleClickOpenForm.birthday}
                            >
                                {birthdayForm ? (
                                    <span>Cancel</span>
                                ) : (
                                    <span
                                        onClick={() =>
                                            setDateOfBirth(user?.dateOfBirth)
                                        }
                                    >
                                        Edit
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('birthday')}>
                            {birthdayForm ? (
                                <div className={cx('content__edit')}>
                                    <div className={cx('form__input')}>
                                        <input
                                            value={dateOfBirth}
                                            type='date'
                                            onChange={(e) =>
                                                setDateOfBirth(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className={cx('form__action')}>
                                        <button
                                            onClick={() =>
                                                setBirthdayForm(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                        {loadingDateOfBirth ? (
                                            <LoadingIcon />
                                        ) : (
                                            <button
                                                onClick={
                                                    handleUpdateDateOfBirth
                                                }
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <i
                                        className={cx(
                                            'fa-light fa-cake-candles'
                                        )}
                                    ></i>
                                    <span>
                                        {moment(user?.dateOfBirth).format(
                                            'MMMM Do YYYY'
                                        )}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Gender */}
                <div className={cx('form__group')}>
                    <div className={cx('heading')}>
                        <div className={cx('title')}>Gender</div>
                        {!loadingGender && (
                            <div
                                className={cx('action')}
                                onClick={handleClickOpenForm.gender}
                            >
                                {genderForm ? (
                                    <span>Cancel</span>
                                ) : (
                                    <span
                                        onClick={() => {
                                            setGender(user?.gender);
                                        }}
                                    >
                                        Edit
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('birthday')}>
                            {genderForm ? (
                                <div className={cx('content__edit')}>
                                    <div className={cx('form__input')}>
                                        <select
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <option value='male'>Male</option>
                                            <option value='female'>
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                    <div className={cx('form__action')}>
                                        <button
                                            onClick={() => setGenderForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        {loadingGender ? (
                                            <LoadingIcon />
                                        ) : (
                                            <button
                                                onClick={handleUpdateGender}
                                            >
                                                Save
                                            </button>
                                        )}
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
