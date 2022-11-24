import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';

import userApi from '@/api/userApi';

import { updatePlayerPro } from '@/_redux/features/player/playerSlice';

import styles from './Content.module.scss';
import Image from '@/components/Image';
import LoadingIcon from '@/layouts/LoadingIcon';

const cx = classNames.bind(styles);

function PlayersProFilterByGame() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [usersPro, setUsersPro] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleClickToProfile = (urlCode) => {
        navigate(`/player/profile/${urlCode}`);
    };

    useEffect(() => {
        const fetchUsersProByGame = async () => {
            try {
                setLoading(true);
                const { data } = await userApi.get(`v1/game/${id}`);
                console.log('check data', data);
                setLoading(false);
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || 'Something went wrong!'
                );
                setLoading(false);
            }
        };
        fetchUsersProByGame();
    }, [id]);

    // const handleUpdateProStore = async () => {
    //     try {
    //         setLoading(true);
    //         const { data } = await userApi.get('v1/game');
    //         console.log("data", data);
    //         setLoading(false);
    //     } catch (err) {
    //         toast.error(err?.response?.data?.error || 'Something went wrong!');
    //         setLoading(false);
    //     }
    // };

    return (
        <div className={cx('player')}>
            <div className={cx('heading')}>
                <span className={cx('player__title')}>PLAYERS</span>
                {/* <div className={cx('reload')}>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <div
                            className={cx('reload__btn')}
                            onClick={handleUpdateProStore}
                        >
                            <i
                                className={cx('fa-regular fa-arrows-rotate')}
                            ></i>
                            <span>Reload</span>
                        </div>
                    )}
                </div> */}
            </div>
            <div className={cx('container')}>
                {usersPro?.map((player, index) =>
                    index < 8 ? (
                        // <Link to={`/profile/${player.urlCode}`}>
                        <div
                            key={player.user.urlCode}
                            className={cx('card')}
                            onClick={() =>
                                handleClickToProfile(player.user.urlCode)
                            }
                        >
                            <div className={cx('card__image')}>
                                <Image src={player.user.avatar} alt='' />
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
                                    </span>
                                </div>

                                <div className={cx('card__bio')}>
                                    <span>{player.description}</span>
                                </div>

                                <div className={cx('card__footer')}>
                                    <div className={cx('game__play')}>
                                        {player?.get_game &&
                                        player?.get_game.length > 0
                                            ? player?.get_game.map(
                                                  (data, index) => {
                                                      const count =
                                                          player?.get_game
                                                              .length - 5;
                                                      return index < 4 ? (
                                                          <img
                                                              key={data.id}
                                                              src={data.gameImg}
                                                              alt=''
                                                          />
                                                      ) : index === 4 ? (
                                                          <div
                                                              key={data.id}
                                                              className={cx(
                                                                  'game__count'
                                                              )}
                                                              style={{
                                                                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${data.gameImg})`,
                                                              }}
                                                          >
                                                              <span
                                                                  className={cx(
                                                                      'count'
                                                                  )}
                                                              >
                                                                  +{count}
                                                              </span>
                                                          </div>
                                                      ) : null;
                                                  }
                                              )
                                            : null}
                                    </div>
                                    <div className={cx('rating')}>
                                        <StarRatings
                                            rating={player?.avgRate}
                                            starRatedColor='#ffcd3c'
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                        <span>{player.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : // </Link>
                    null
                )}
            </div>
        </div>
    );
}

export default PlayersProFilterByGame;
