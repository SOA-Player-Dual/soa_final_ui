import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import {
    handleModalWithdraw,
    handleModalListFollowing,
} from '@/_redux/features/modal/modalSlice';
import {
    handleModalLogin,
    handleModalRegister,
} from '@/_redux/features/modal/modalSlice';

import styles from './Actions.module.scss';
import Profile from './Profile';
import Notifications from './Notifications';
import Modal from '@/components/Modal';
import Image from '@/components/Image';
import no_following from '@/assets/icons/no_following.svg';

const cx = classNames.bind(styles);

function Actions() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

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
    };

    const handleClick = {
        redirectMessage: () => {
            navigate('/message');
        },
        modalLogin: () => {
            dispatch(handleModalLogin(!store.modalLogin));
        },
        modalRegister: () => {
            dispatch(handleModalRegister(!store.modalRegister));
        },
        redirectUserProfile: (urlCode) => {
            navigate(`/profile/${urlCode}`);
            dispatch(handleModalListFollowing(false));
        },
    };

    return (
        <>
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

                        <Tippy content={'Messenger'}>
                            <div
                                className={cx('action__item')}
                                onClick={handleClick.redirectMessage}
                            >
                                <i
                                    className={cx(
                                        'fab',
                                        ' fa-facebook-messenger'
                                    )}
                                ></i>
                            </div>
                        </Tippy>
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
        </>
    );
}

export default Actions;
