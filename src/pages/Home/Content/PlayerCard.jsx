import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Content.module.scss';
import teamFlight from '@/assets/icons/teamfight.jpg';
import lol from '@/assets/icons/lol.jpg';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

function PlayerCard() {
    const navigate = useNavigate();
    const usersPro = useSelector((state) => state?.user?.usersPro);

    const handleClickToProfile = (urlCode) => {
        console.log(urlCode);
        // navigate(`/profile/${urlCode}`);
    };

    console.log('usersPro', usersPro);
    return (
        <div className={cx('player')}>
            <span className={cx('player__title')}>VIP PLAYER</span>
            <div className={cx('container')}>
                {usersPro?.map((player, index) =>
                    index < 8 ? (
                        // <Link to={`/profile/${player.urlCode}`}>

                        <div
                            key={player.urlCode}
                            className={cx('card')}
                            // onClick={handleClickToProfile(player.urlCode)}
                        >
                            <Link to={`/profile/${player.urlCode}`}>
                                <div className={cx('card__image')}>
                                    <Image src={player.avatar} alt='' />
                                </div>
                                <div className={cx('card__info')}>
                                    <div className={cx('card__info-name')}>
                                        <span>{player.name}</span>
                                        <span className={cx('is__active')}>
                                            <i
                                                className={cx(
                                                    'fa-solid',
                                                    'fa-circle'
                                                )}
                                            ></i>
                                            {/* {player.isOnline ? (
                                                    <i
                                                        className={cx(
                                                            'fa-solid',
                                                            'fa-circle'
                                                        )}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        style={{ color: 'gray' }}
                                                        className={cx(
                                                            'fa-solid',
                                                            'fa-circle'
                                                        )}
                                                    ></i>
                                                )} */}
                                        </span>
                                    </div>

                                    <div className={cx('card__bio')}>
                                        <span>{player.description}</span>
                                    </div>

                                    {/* <div className={cx('card__footer')}>
                                            <div className={cx('game__play')}>
                                                {player.gamePlay.map((data, index) => {
                                                    const count =
                                                        player.gamePlay.length - 5;
                                                    return index < 4 ? (
                                                        <img
                                                            key={index}
                                                            src={data}
                                                            alt=''
                                                        />
                                                    ) : index === 4 ? (
                                                        <div
                                                            key={index}
                                                            className={cx(
                                                                'game__count'
                                                            )}
                                                            style={{
                                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${data})`,
                                                            }}
                                                        >
                                                            <span
                                                                className={cx('count')}
                                                            >
                                                                +{count}
                                                            </span>
                                                        </div>
                                                    ) : null;
                                                })}
                                            </div>
        
                                            <div className={cx('rating')}>
                                                <i
                                                    className={cx(
                                                        'fa-sharp',
                                                        'fa-solid',
                                                        'fa-star'
                                                    )}
                                                ></i>
                                                <span>{player.rating}</span>
                                            </div>
                                        </div> */}
                                </div>
                            </Link>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}

export default PlayerCard;
