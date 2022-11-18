import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { Login } from '@/api/user_api';
import { setUserAuth, setUserID } from '@/_redux/features/user/userSlice';

import styles from './SignIn.module.scss';
import login_bg from '@/assets/images/login-bg.png';
import logo from '@/assets/icons/logo.png';
import google_logo from '@/assets/icons/google.png';
import useEnterKeyListener from '@/hooks/useEnterKeyListener';

const cx = classNames.bind(styles);

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEnterKeyListener({
        querySelectorToExecuteClick: '#submitLoginBtn',
    });

    const handleClick = {
        ridirectToSignUp: () => {
            navigate('/register');
        },
        Login: async () => {
            if (!username) {
                toast.error('Please enter your username');
                usernameRef.current.focus();
                return;
            }
            if (!password) {
                toast.error('Please enter your password');
                passwordRef.current.focus();
                return;
            }

            try {
                const res = await Login(username, password);
                const userID = jwt_decode(res?.data?.accessToken);

                console.log(res);
                dispatch(setUserAuth(res?.data));
                dispatch(setUserID(userID?.id));
                // navigate('/');
                toast.success('Login success!');
            } catch (error) {
                toast.error(error?.response?.data?.error);
            }
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
                            ref={usernameRef}
                            value={username}
                            className={cx('form-control')}
                            type='text'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            ref={passwordRef}
                            value={password}
                            className={cx('form-control')}
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            id='submitLoginBtn'
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
