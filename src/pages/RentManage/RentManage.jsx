import { useParams } from 'react-router-dom';
import moment from 'moment';

import classNames from 'classnames/bind';

import styles from './RentManage.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function RentManage() {
    const { id } = useParams();

    const contract_data = useSelector(
        (state) => state?.user?.user?.playerContract
    );

    const contract = contract_data?.find((item) => item.id === id);

    //     console.log('contract', contract);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span>Manage Rent</span>
                </div>

                <div className={cx('user__avatar')}>
                    <img src={contract.avatar} alt='' />
                </div>

                <div className={'user__name'}>{contract.user_name}</div>
                <div className={cx('user__amount-time')}>
                    <span>Time of rent: {contract.time} hour</span>
                </div>
                <div className={cx('time__renting')}>
                    <span>
                        Required rent at:{' '}
                        {moment(contract.created_at).calendar()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default RentManage;
