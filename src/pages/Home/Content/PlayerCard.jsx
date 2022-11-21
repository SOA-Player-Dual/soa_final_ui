import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import styles from './Content.module.scss';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

function PlayerCard() {
    const navigate = useNavigate();
    const usersPro = useSelector((state) => state?.player?.playersPro);

    const handleClickToProfile = (urlCode) => {
        navigate(`/profile/${urlCode}`);
    };

    return (
        <div className={cx('player')}>
            <span className={cx('player__title')}>VIP PLAYER</span>
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

export default PlayerCard;
