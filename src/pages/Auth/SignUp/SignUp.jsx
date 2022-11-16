import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';

import login_bg from '@/assets/images/login-bg.png';
import logo from '@/assets/icons/logo.png';

const cx = classNames.bind(styles);

function SignUp() {
    const navigate = useNavigate();
    const handleClick = {
        ridirectToSignIn: () => {
            navigate('/login');
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
                    <span>Already have account?</span>
                    <button onClick={handleClick.ridirectToSignIn}>
                        Sign in
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
                        <div className={cx('logo')}>
                            <div className={cx('logo__image')}>
                                <img src={logo} alt='logo' />
                            </div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
