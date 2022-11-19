import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { handleModalWithdraw } from '@/_redux/features/modal/modalSlice';
import { logout } from '@/_redux/features/user/userSlice';

import styles from './Actions.module.scss';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

function Tooltipes({ profileHref }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state?.user?.user?.information);

    const handleClickWithDraw = () => {
        dispatch(handleModalWithdraw(true));
    };

    const handleLogout = () => {
        localStorage.removeItem('acessToken');
        dispatch(logout());
        navigate('/');
        toast.success('Logout successfully!');
    };

    return (
        <div className={cx('tooltip')}>
            <div className={cx('tooltip-container')}>
                <Link
                    to={`/user/profile/${user?.nickname}`}
                    onClick={profileHref.current._tippy.hide()}
                >
                    <div className={cx('tooltip-item', 'profile')}>
                        {user?.avatar ? (
                            <img
                                className={cx('avatar')}
                                src={user?.avatar}
                                alt='avatar'
                            />
                        ) : (
                            <Image
                                className={cx('avatar')}
                                src=''
                                alt='avatar'
                            />
                        )}

                        <div className={cx('info')}>
                            <span className={cx('name')}>
                                {user?.player?.name}
                            </span>
                            <span className={cx('id')}>
                                Balance:&nbsp;
                                <span className={cx('id__name')}>
                                    {user?.balance}
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>

                <div
                    className={cx('tooltip-item')}
                    onClick={handleClickWithDraw}
                >
                    <div className={cx('label__icon')}>
                        <i className={cx('fa-regular', 'fa-sack-dollar')}></i>
                    </div>
                    <span className={cx('tooltip-item__label')}>Withdraw</span>
                </div>

                <div className={cx('tooltip-item')}>
                    <div className={cx('label__icon')}>
                        <i className={cx('fa-regular', 'fa-credit-card')}></i>
                    </div>
                    <span className={cx('tooltip-item__label')}>Buy card</span>
                </div>

                <div className={cx('tooltip-item')}>
                    <div className={cx('label__icon')}>
                        <i className={cx('fa-regular', 'fa-user-group')}></i>
                    </div>
                    <span className={cx('tooltip-item__label')}>
                        Follower list
                    </span>
                </div>

                <div className={cx('tooltip-item')}>
                    <div className={cx('label__icon')}>
                        <i className={cx('fa-regular', 'fa-gear')}></i>
                    </div>
                    <span className={cx('tooltip-item__label')}>
                        Account settings
                    </span>
                </div>

                <hr />

                <div
                    className={cx('tooltip-item', 'tooltip-item__logout')}
                    onClick={handleLogout}
                >
                    <div className={cx('label__icon')}>
                        <i
                            className={cx(
                                'fa-regular',
                                'fa-right-from-bracket'
                            )}
                        ></i>
                    </div>

                    <span className={cx('tooltip-item__label')}>Log out</span>
                </div>
            </div>
        </div>
    );
}

export default Tooltipes;
