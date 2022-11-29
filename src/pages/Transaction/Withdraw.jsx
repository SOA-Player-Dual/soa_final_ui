import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './Transaction.module.scss';

const cx = classNames.bind(styles);

function Withdraw() {
    const withdraw = useSelector((state) => state?.user?.user?.withdraw);
    return (
        <div className={cx('topup__wrapper')}>
            {withdraw && withdraw.length > 0 ? (
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell
                                scope='col'
                                style={{
                                    width: '10%',
                                    // display: 'flex',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                }}
                            >
                                ID
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope='col'
                                style={{ width: '45%' }}
                            >
                                Amount withdraw
                            </CTableHeaderCell>
                            <CTableHeaderCell
                                scope='col'
                                style={{ width: '45%' }}
                            >
                                Date withdraw
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {withdraw.map((item, index) => {
                            return (
                                <CTableRow key={item.id}>
                                    <CTableHeaderCell scope='row'>
                                        {index + 1}
                                    </CTableHeaderCell>
                                    <CTableDataCell>
                                        {item.amount.toLocaleString()}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {moment(item?.created_at).calendar()}
                                    </CTableDataCell>
                                </CTableRow>
                            );
                        })}
                    </CTableBody>
                </CTable>
            ) : (
                "You don't have any withdraw history"
            )}
        </div>
    );
}

export default Withdraw;
