import classNames from 'classnames/bind';

import styles from './Content.module.scss';
import Swipers from './Swipers';
import PlayerCard from './PlayerCard';

const cx = classNames.bind(styles);

function Content() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <Swipers />
            </div>

            {/* <div className={cx('sidebar_verti')}></div> */}

            <PlayerCard />
        </div>
    );
}

export default Content;
