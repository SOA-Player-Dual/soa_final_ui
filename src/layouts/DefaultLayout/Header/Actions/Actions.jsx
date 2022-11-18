import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { handleModalWithdraw } from '@/_redux/features/modal/modalSlice';

import styles from './Actions.module.scss';
import Profile from './Profile';
import Notifications from './Notifications';
import Modal from '@/components/Modal';

const cx = classNames.bind(styles);

function Actions() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const modalWithDraw = useSelector(
        (state) => state.modal.modalType.modalWithdraw
    );

    const handleClickMessenger = () => {
        navigate('/messenger');
    };

    const isLogin = useSelector((state) => state?.user?.user?.isLogin);

    return (
        <>
            {modalWithDraw && (
                <Modal
                    title='With Draw'
                    showModal={modalWithDraw}
                    setShowModal={() => dispatch(handleModalWithdraw(false))}
                >
                    Haha
                </Modal>
            )}
            <div className={cx('wrapper')}>
                {isLogin ? (
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
                                onClick={handleClickMessenger}
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
                        <Link to='/login'>
                            <span className={cx('auth__btn-login')}>
                                Sign in
                            </span>
                        </Link>

                        <Link to='/register'>
                            <button className={cx('auth__btn-register')}>
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default Actions;
