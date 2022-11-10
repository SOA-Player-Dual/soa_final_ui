import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';

import login_bg from '@/assets/images/login-bg.png';
import facebookIcon from '@/assets/icons/facebook.png';
import googleIcon from '@/assets/icons/google.png';

const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img
                        className={cx('image__action')}
                        src={login_bg}
                        alt='login'
                    />
                </div>
                <div className={cx('form')}>
                    <div className={cx('form__container')}>
                        <h3 className={cx('form__title')}>Sign up</h3>
                        <input
                            className={cx('form-control')}
                            type='text'
                            placeholder='Email'
                        />

                        <input
                            className={cx('form-control')}
                            type='password'
                            placeholder='Password'
                        />

                        <button className={cx('form-control', 'form-btn')}>
                            Sign up
                        </button>

                        <div className={cx('form__footer')}>
                            <span>Or sign up with</span>
                            <div className={cx('form__footer-container')}>
                                <img
                                    className={cx(
                                        'form__footer-icon',
                                        'facebook'
                                    )}
                                    src={facebookIcon}
                                    alt='facebook'
                                />
                                <img
                                    className={cx(
                                        'form__footer-icon',
                                        'google'
                                    )}
                                    src={googleIcon}
                                    alt='google'
                                />
                            </div>
                        </div>

                        <div className={cx('register')}>
                            <span>
                                Already have an account?
                                <Link
                                    className={cx('resgister__direct')}
                                    to='/login'
                                >
                                    Login
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
