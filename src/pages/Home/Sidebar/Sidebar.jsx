import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import lolIcon from '@/assets/icons/lol.jpg';
import tfIcon from '@/assets/icons/teamfight.jpg';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

const gameList = [
    {
        id: 1,
        name: 'League of Legends',
        image: lolIcon,
    },

    {
        id: 2,
        name: 'Teamfight Tactics',
        image: tfIcon,
    },
    {
        id: 3,
        name: 'Pubg Mobile',
        image: tfIcon,
    },
    {
        id: 4,
        name: `PlayerUnknown's Battlegrounds`,
        image: tfIcon,
    },
    {
        id: 5,
        name: 'Arena of Valor',
        image: tfIcon,
    },
    {
        id: 6,
        name: 'League of Legends: Wild Rift',
        image: tfIcon,
    },
    {
        id: 7,
        name: 'Free Fire',
        image: tfIcon,
    },
    {
        id: 8,
        name: 'Valorant',
        image: tfIcon,
    },
    {
        id: 9,
        name: 'CSGO',
        image: tfIcon,
    },
    {
        id: 10,
        name: 'Call of Duty',
        image: tfIcon,
    },
];

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Game list</span>
            <div className={cx('game')}>
                {gameList.map((data) => {
                    return (
                        <div key={data.id} className={cx('list-item')}>
                            <Image
                                className={cx('item__icon')}
                                src={data.image}
                            />
                            <span className={cx('item__label')}>
                                {data.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;
