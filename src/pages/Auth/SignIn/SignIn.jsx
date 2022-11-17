import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { useNavigate, Link } from 'react-router-dom';

import { Login } from '@/api/user_api';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import login_bg from '@/assets/images/login-bg.png';
import logo from '@/assets/icons/logo.png';
import google_logo from '@/assets/icons/google.png';

const cx = classNames.bind(styles);

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = {
        ridirectToSignUp: () => {
            navigate('/register');
        },
        Login: () => {
            const res = Login(username, password);
            console.log(res);
        },
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <div className={cx('logo')}>
                    <img className={cx('logo__image')} src={logo} alt='logo' />
                    <span className={cx('logo__name')}>PLAYERDUAL</span>
                </div>

                <div className={cx('heading__action')}>
                    <span>Don't have account?</span>
                    <button onClick={handleClick.ridirectToSignUp}>
                        Sign up
                    </button>
                </div>
            </div>
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
                        {/* <h3 className={cx('form__title')}>Sign in</h3> */}
                        <div className={cx('logo')}>
                            <div className={cx('logo__image')}>
                                <img src={logo} alt='logo' />
                            </div>
                        </div>

                        <input
                            value={username}
                            className={cx('form-control')}
                            type='text'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            value={password}
                            className={cx('form-control')}
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className={cx('form-control', 'form-btn')}
                            onClick={handleClick.Login}
                        >
                            Sign in
                        </button>

                        <div className={cx('forgot-password')}>
                            <Link to='/forgot-password'>
                                <span>Forgot password?</span>
                            </Link>
                        </div>

                        {/* 
                        <div className={cx('hr')}>
                            <div className={cx('hr-custom')}>
                                <span className={cx('hr-custom__title')}>
                                    Or sign in with
                                </span>
                            </div>
                        </div> */}

                        <div className={cx('form__footer')}>
                            <div className={cx('form__footer-container')}>
                                <div
                                    className={cx('google__btn')}
                                    onClick={() => {
                                        document
                                            .querySelector(
                                                '.firebaseui-idp-button'
                                            )
                                            .click();
                                    }}
                                >
                                    <div className={cx('google__btn-icon')}>
                                        <img src={google_logo} alt='' />
                                    </div>
                                    <span>Sign in with google</span>
                                </div>
                                <div style={{ display: 'none' }}>
                                    <StyledFirebaseAuth
                                        uiConfig={uiConfig}
                                        firebaseAuth={firebase.auth()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
