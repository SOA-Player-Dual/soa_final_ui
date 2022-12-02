import classNames from 'classnames/bind';

import styles from './ContractManagement.module.scss';

const cx = classNames.bind(styles);

function ContractManagement() {
    return (
        <div className={cx('wrapper')}>
            <h1>Contract Management</h1>
        </div>
    );
}

export default ContractManagement;
