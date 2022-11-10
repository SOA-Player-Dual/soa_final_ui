import classNames from 'classnames/bind';

import Image from '@/components/Image';
import styles from './Actions.module.scss';

const cx = classNames.bind(styles);

const notification = [
    {
        id: 1,
        auth: 'System',
        title: 'you have a new message need to read.',
        time: '1 hour ago',
    },
    {
        id: 2,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 3,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 4,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 5,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 6,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 7,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 8,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 9,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
    {
        id: 10,
        auth: 'Hoa',
        title: 'accept your follow.',
        time: '2 hour ago',
    },
];

function NoticationTT() {
    return (
        <div className={cx('tooltip-container-notification')}>
            <span className={cx('title')}>Notifications</span>
            {notification ? (
                <>
                    {notification.map((noti) => {
                        return (
                            <div key={noti.id} className={cx('tooltip-item')}>
                                <div>
                                    <Image
                                        className={cx('tooltip-item__avatar')}
                                        src=''
                                    />
                                </div>
                                <div className={cx('container')}>
                                    <div className={cx('content')}>
                                        <div>
                                            <span
                                                className={cx('info-content')}
                                            >
                                                {noti.auth}
                                            </span>
                                            {noti.title}
                                        </div>

                                        <span
                                            className={cx('tooltip-item__time')}
                                        >
                                            {noti.time}
                                        </span>
                                    </div>

                                    <div className={cx('tooltip-item__check')}>
                                        <i
                                            className={cx(
                                                'fa-solid',
                                                'fa-circle'
                                            )}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <div className={cx('no-notification')}>
                    <span>No notifications</span>
                </div>
            )}
        </div>
    );
}

export default NoticationTT;
