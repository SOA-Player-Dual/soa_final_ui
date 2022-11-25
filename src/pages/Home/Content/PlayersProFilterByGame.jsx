import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import styles from './Content.module.scss';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

function PlayersProFilterByGame() {
    const { id } = useParams();
    const navigate = useNavigate();

    const player = useSelector((state) => state.player.playersPro);
    const games = useSelector((state) => state?.games?.games);

    const gameName = games?.find((game) => game.id === id)?.game ?? '';

    // return user that have game equal to id
    const usersPro = player.filter((user) => {
        return user.get_game.find((game) => game.id === id) !== undefined;
    });

    const handleClickToProfile = (urlCode) => {
        navigate(`/player/profile/${urlCode}`);
    };

    return (
        <div className={cx('player')}>
            <div className={cx('heading')}>
                <span className={cx('player__title')}>{gameName}</span>
                <span
                    className={cx('filter__all')}
                    onClick={() => navigate('/')}
                >
                    All players
                </span>
            </div>
            {usersPro && usersPro.length > 0 ? (
                <div className={cx('card__wrapper')}>
                    {usersPro && usersPro.length > 0
                        ? usersPro.map((player, index) => (
                              <div
                                  className={cx('card')}
                                  key={player.user.urlCode}
                                  onClick={() =>
                                      handleClickToProfile(player.user.urlCode)
                                  }
                              >
                                  <div className={cx('card__image')}>
                                      {player?.user?.avatar &&
                                      player?.user?.avatar !== '' ? (
                                          <img
                                              src={player?.user?.avatar}
                                              alt='avatar'
                                          />
                                      ) : (
                                          <Image src='' alt='avatar' />
                                      )}
                                  </div>

                                  <div className={cx('card__content')}>
                                      <div className={cx('heading')}>
                                          <div className={cx('user__name')}>
                                              <span>{player?.name}</span>
                                          </div>
                                          <div className={cx('is-active')}>
                                              <i
                                                  className={cx(
                                                      'fa-solid',
                                                      'fa-circle'
                                                  )}
                                              ></i>
                                          </div>
                                      </div>

                                      <div className={cx('bio')}>
                                          <span>{player?.description}</span>
                                      </div>

                                      <div className={cx('footer')}>
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
                                                                    key={
                                                                        data.id
                                                                    }
                                                                    src={
                                                                        data.gameImg
                                                                    }
                                                                    alt=''
                                                                />
                                                            ) : index === 4 ? (
                                                                <div
                                                                    key={
                                                                        data.id
                                                                    }
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
                                                  rating={5}
                                                  starRatedColor='#ffcd3c'
                                                  // changeRating={this.changeRating}
                                                  numberOfStars={5}
                                                  name='rating'
                                              />
                                              <span>{5}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            ) : (
                <div className={cx('no__data')}>
                    Oops! No has player play this game.
                </div>
            )}

            {/* Load more button */}
        </div>
    );
}

export default PlayersProFilterByGame;
