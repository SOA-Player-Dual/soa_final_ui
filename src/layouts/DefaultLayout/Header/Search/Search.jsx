import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <input className={cx('input')} type='text' placeholder='Search' />
            <div className={cx('search__btn')}>
                <i className={cx('fa-regular', 'fa-magnifying-glass')}></i>
            </div>
        </div>
    );
}

export default Search;
