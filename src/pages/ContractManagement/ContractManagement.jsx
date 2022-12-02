import classNames from 'classnames/bind';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

import styles from './ContractManagement.module.scss';

const cx = classNames.bind(styles);

function ContractManagement() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span> Contract management</span>
            </div>
        </div>
    );
}

export default ContractManagement;
