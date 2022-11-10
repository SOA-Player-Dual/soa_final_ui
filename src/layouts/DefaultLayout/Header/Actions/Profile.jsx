import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css';

import Image from '@/components/Image';
import styles from './Actions.module.scss';
import Tooltipes from './Tooltipes';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Profile() {
    const profileHref = useRef();
    return (
        <div className={cx('profile__wrapper')}>
            <Tippy
                ref={profileHref}
                content={<Tooltipes profileHref={profileHref} />}
                trigger='click'
                placement='bottom-start'
                interactive
                arrow
                animation='scale'
                theme='light'
            >
                <Image className={cx('avatar')} src='' />
            </Tippy>
        </div>
    );
}

export default Profile;
