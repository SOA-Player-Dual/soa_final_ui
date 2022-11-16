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
            <div className={cx('content')}>
                {/* <div className={cx('search')}>
                    <div className={cx('filter')}>
                        <select
                            name=''
                            id=''
                            className={cx('filter__item', 'filter__gender')}
                        >
                            <option value=''>Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>

                        <div className={cx('filter__item')}>Online</div>
                        <input
                            type='text'
                            placeholder='Name player'
                            className={cx('filter__item', 'filter__name')}
                        />
                        <input
                            type='text'
                            placeholder='Game name'
                            className={cx('filter__item', 'filter__name')}
                        />
                    </div>
                    <div className={cx('btn__search')}>
                        <i
                            className={cx('fa-light', 'fa-magnifying-glass')}
                        ></i>
                        Search
                    </div>
                </div> */}
            </div>

            <PlayerCard />
        </div>
    );
}

export default Content;
