import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import userApi from '@/api/userApi';

import {
    handleModalWithdraw,
    handleModalListFollowing,
} from '@/_redux/features/modal/modalSlice';
import {
    handleModalLogin,
    handleModalRegister,
    handleChangePassModal,
    handleTopupModal,
} from '@/_redux/features/modal/modalSlice';

import styles from './Actions.module.scss';
import Profile from './Profile';
import Notifications from './Notifications';
import Modal from '@/components/Modal';
import Image from '@/components/Image';
import LoadingIcon from '@/layouts/LoadingIcon';
import no_following from '@/assets/icons/no_following.svg';

const cx = classNames.bind(styles);

function Actions() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const confirmPassRef = useRef(null);

    const [changePassLoading, setChangePassLoading] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const store = {
        isLogin: useSelector((state) => state?.user?.user?.isLogin),
        listFollowing: useSelector((state) => state?.user?.user?.following),
        modalLogin: useSelector((state) => state?.modal?.modalType?.modalLogin),
        modalRegister: useSelector(
            (state) => state?.modal?.modalType?.modalRegister
        ),
        modalWithdraw: useSelector(
            (state) => state?.modal?.modalType?.modalWithdraw
        ),
        modalListFollowing: useSelector(
            (state) => state?.modal?.modalType?.modalListFollowing
        ),
        changePassModal: useSelector(
            (state) => state?.modal?.modalType?.changePassModal
        ),
        topupModal: useSelector((state) => state?.modal?.modalType?.topupModal),
    };

    const handleClick = {
        redirectMessenger: () => {
            navigate('/messengers');
        },
        modalLogin: () => {
            navigate('/');
            dispatch(handleModalLogin(true));
        },
        modalRegister: () => {
            navigate('/');
            dispatch(handleModalRegister(true));
        },
        redirectUserProfile: (urlCode) => {
            navigate(`/profile/${urlCode}`);
            dispatch(handleModalListFollowing(false));
        },
        changePassword: async () => {
            if (!currentPass || !newPass || !confirmPass) {
                toast.error('Please fill all fields');
                setChangePassLoading(false);
                return;
            }

            if (newPass !== confirmPass) {
                setChangePassLoading(false);
                toast.error('Confirm password is not match, please try again!');
                confirmPassRef.current.focus();
                return;
            }

            try {
                setChangePassLoading(true);
                const { data } = await userApi.post('v1/auth/password', {
                    password: currentPass,
                    newPassword: confirmPass,
                });

                console.log('Check data: ', data);
                toast.success('Change password successfully!');
                setChangePassLoading(false);
                dispatch(handleChangePassModal(false));
            } catch (e) {
                toast.error(
                    e?.response?.data?.error ||
                        "Something's wrong, please try later!"
                );
                setChangePassLoading(false);
            }
        },
    };

    return (
        <>
            <div className={cx('wrapper')}>
                {store.isLogin ? (
                    <>
                        <Tippy
                            content={<Notifications />}
                            trigger='click'
                            placement='bottom-start'
                            interactive
                            arrow
                            animation='scale'
                            theme='light'
                        >
                            <div className={cx('action__item')}>
                                <i className={cx('fa-solid', 'fa-bell')}></i>
                            </div>
                        </Tippy>

                        <div
                            className={cx('action__item')}
                            onClick={handleClick.redirectMessenger}
                        >
                            <i
                                className={cx('fab', ' fa-facebook-messenger')}
                            ></i>
                        </div>

                        <Profile />
                    </>
                ) : (
                    <div className={cx('auth__btn')}>
                        {/* <Link to='/login'> */}
                        <span
                            className={cx('auth__btn-login')}
                            onClick={handleClick.modalLogin}
                        >
                            Sign in
                        </span>
                        {/* </Link> */}

                        {/* <Link to='/register'> */}
                        <button
                            className={cx('auth__btn-register')}
                            onClick={handleClick.modalRegister}
                        >
                            Sign up
                        </button>
                        {/* </Link> */}
                    </div>
                )}
            </div>
            {/* Change password modal */}
            {store.changePassModal && (
                <Modal
                    title={'Change password'}
                    show={store.changePassModal}
                    close={() => dispatch(handleChangePassModal(false))}
                    size={'medium'}
                    notCloseOutside={true}
                >
                    <div className={cx('modal__change-pass')}>
                        <div className={cx('form-control-modal')}>
                            <div className={cx('form__role')}>
                                <div className={cx('form__role__item')}>
                                    <span>
                                        <i
                                            className={cx('fa-regular fa-lock')}
                                        ></i>
                                        Current password
                                    </span>
                                    <input
                                        value={currentPass}
                                        className={cx('form-control')}
                                        type='password'
                                        placeholder='Password'
                                        onChange={(e) =>
                                            setCurrentPass(
                                                e.target.value.trim()
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={cx('form__role')}>
                                <div className={cx('form__role__item')}>
                                    <span>
                                        <i
                                            className={cx('fa-regular fa-lock')}
                                        ></i>
                                        New password
                                    </span>
                                    <input
                                        value={newPass}
                                        className={cx('form-control')}
                                        type='password'
                                        placeholder='Password'
                                        onChange={(e) =>
                                            setNewPass(e.target.value.trim())
                                        }
                                    />
                                </div>
                            </div>

                            <div className={cx('form__role')}>
                                <div className={cx('form__role__item')}>
                                    <span>
                                        <i
                                            className={cx('fa-regular fa-lock')}
                                        ></i>
                                        Confirm new password
                                    </span>
                                    <input
                                        ref={confirmPassRef}
                                        value={confirmPass}
                                        className={cx('form-control')}
                                        type='password'
                                        placeholder='Password'
                                        onChange={(e) =>
                                            setConfirmPass(
                                                e.target.value.trim()
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={cx('form-control-btn')}>
                                {changePassLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <button
                                        id={'changePassBtn'}
                                        className={cx('form-btn')}
                                        onClick={handleClick.changePassword}
                                    >
                                        Change password
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Top up modal */}
            {store.topupModal && (
                <Modal
                    title={'Top up'}
                    show={store.topupModal}
                    close={() => dispatch(handleTopupModal(false))}
                    size={'medium'}
                >
                    <div className={cx('modal__topup')}>
                        <div className={cx('form-control-modal')}>
                            <div className={cx('form__role')}>
                                <div className={cx('form__role__item')}>
                                    <span>
                                        <i
                                            className={cx('fa-regular fa-lock')}
                                        ></i>
                                        Current password
                                    </span>
                                    <input
                                        value={currentPass}
                                        className={cx('form-control')}
                                        type='password'
                                        placeholder='Password'
                                        onChange={(e) =>
                                            setCurrentPass(
                                                e.target.value.trim()
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* With draw */}
            {store.modalWithdraw && (
                <Modal
                    title='With Draw'
                    size={'medium'}
                    show={store.modalWithdraw}
                    close={() => dispatch(handleModalWithdraw(false))}
                >
                    <div className={'modal'}></div>
                </Modal>
            )}
            {store.modalListFollowing && (
                <Modal
                    title='Following'
                    size={'medium'}
                    show={store.modalListFollowing}
                    close={() => dispatch(handleModalListFollowing(false))}
                >
                    <div className={cx('modal__following-list')}>
                        {store?.listFollowing.following > 0 ? (
                            <>
                                <span>
                                    Following total:&nbsp;
                                    {store.listFollowing.following}{' '}
                                </span>
                                {store?.listFollowing?.followingData.map(
                                    (item, index) => {
                                        return (
                                            <div
                                                key={item?.urlCode}
                                                className={cx(
                                                    'modal__following-list__item'
                                                )}
                                                onClick={() =>
                                                    handleClick.redirectUserProfile(
                                                        item?.urlCode
                                                    )
                                                }
                                            >
                                                <div className={cx('avatar')}>
                                                    {item?.avatar ? (
                                                        <img
                                                            src={item?.avatar}
                                                            alt='avatar'
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={item?.avatar}
                                                            alt='avatar'
                                                        />
                                                    )}
                                                </div>
                                                <div className={cx('name')}>
                                                    {item?.nickname}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </>
                        ) : (
                            <div className={cx('not__following')}>
                                <div className={cx('title')}>
                                    You are not following anyone!
                                </div>
                                <div className={cx('not__following-img')}>
                                    <img
                                        src={no_following}
                                        alt='no-following'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Actions;
