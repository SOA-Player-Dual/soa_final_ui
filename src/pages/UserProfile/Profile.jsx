import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import Header from './Header';
import BodyContent from './Body';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <BodyContent />
        </div>
    );
}

export default Profile;
