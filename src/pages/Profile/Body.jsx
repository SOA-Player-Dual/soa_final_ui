import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClampText } from 'use-clamp-text';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import {
    setClickedImg,
    setCurrentIndex,
} from '@/_redux/features/previewer/previewerSlice';

import Image from '@/components/Image';
import ImagePreviewer from '@/components/ImagePreviewer';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Body({ ratingRef }) {
    const distpach = useDispatch();

    const store = {
        player: useSelector((state) => state?.player?.profile),
        playerDonate: useSelector((state) => state?.player?.donate),
    };

    const imgPreviewer = useSelector((state) => state.previewer.previewer);
    // * Image preview

    const handleClick = (item, index) => {
        distpach(setCurrentIndex(index));
        distpach(setClickedImg(item));
    };

    let albumGallery = [];
    if (store?.player?.player?.album) {
        albumGallery = JSON.parse(`${store?.player?.player?.album}`);
    }

    const getVideoId = (url) => {
        let videoId;
        if (url.includes('youtu.be')) {
            videoId = url.split('be/')[1];
        }
        if (url.includes('watch?v=')) {
            videoId = url.split('v=')[1];
        }
        return videoId;
    };

    const embedYoutobe = (url) => {
        const videoId = getVideoId(url);

        return `https://www.youtube.com/embed/${videoId}`;
    };

    // //* Truncate text
    // const _text = `💬 Hi mn. Tôi tên Chi 🤍`;
    // const [text] = useState(_text);
    // const [expanded, setExpanded] = useState(false);
    // const [ref, { noClamp, clampedText, key }] = useClampText({
    //     text,
    //     lines: 6,
    //     ellipsis: 100,
    //     expanded,
    // });
    // const toggleExpanded = () => setExpanded((state) => !state);

    //* Scroll to Rating

    return (
        <>
            {imgPreviewer?.clickedImg && (
                <ImagePreviewer sourceImage={albumGallery} />
            )}
            <div className={cx('body__wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('intro')}>
                        <div className={cx('container__box')}>
                            <div className={cx('title')}>Intro</div>
                            <div className={cx('intro__bio')}>
                                <span>
                                    {store?.player?.player?.description}
                                </span>
                            </div>
                            <hr />
                            <div className={cx('intro__birtday')}>
                                <i
                                    className={cx('fa-thin', 'fa-cake-candles')}
                                ></i>
                                <div className={cx('info')}>
                                    <p>
                                        {moment(
                                            store?.player?.dateOfBirth
                                        ).format('MMMM Do YYYY')}
                                    </p>
                                    <span>Birthday</span>
                                </div>
                            </div>
                        </div>

                        {store?.playerDonate &&
                        store?.playerDonate?.length > 0 ? (
                            <div
                                className={cx('container__box', 'top__donate')}
                            >
                                <div className={cx('title')}>Top Donate</div>
                                {store?.playerDonate?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cx('top__donate__list')}
                                    >
                                        <div className={cx('rank__donate')}>
                                            1
                                        </div>

                                        <div className={cx('donater__avatar')}>
                                            <img
                                                src={item.user.avatar}
                                                alt=''
                                            />
                                        </div>

                                        <div className={cx('donater__info')}>
                                            <span> {item?.user?.nickname}</span>
                                            <span>
                                                Total donated:{' '}
                                                <i>
                                                    {item?.donateTotal.toLocaleString()}{' '}
                                                    VND
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className={cx('content')}>
                        {/* {store?.player?.post &&
                            Object.keys(store?.player?.post).length > 0 &&
                            store?.player?.post?.media !== null &&
                            store?.player?.post?.content !== null && ( */}
                        <div className={cx('container__box', 'info')}>
                            <div className={cx('info__title')}>
                                <span className={cx('title')}>Infomation</span>
                                <div className={cx('info__action')}>
                                    <i
                                        className={cx(
                                            'fa-regular',
                                            'fa-ellipsis'
                                        )}
                                    ></i>
                                </div>
                            </div>
                            {store?.player?.post?.content && (
                                <div className={cx('info__caption')}>
                                    <span>{store?.player?.post?.content}</span>
                                </div>
                            )}

                            <div className={cx('content__container')}>
                                {store?.player?.post ? (
                                    store?.player?.post?.type === 'video' ? (
                                        <div className={cx('video__content')}>
                                            <iframe
                                                src={
                                                    store?.player?.post
                                                        ?.media &&
                                                    store?.player?.post?.media
                                                        .length > 0
                                                        ? embedYoutobe(
                                                              store?.player
                                                                  ?.post?.media
                                                          )
                                                        : ''
                                                }
                                                title='Video'
                                                allowFullScreen
                                                loading='lazy'
                                            ></iframe>
                                        </div>
                                    ) : (
                                        store?.player?.post?.media &&
                                        store?.player?.post?.media.length >
                                            0 && (
                                            <div
                                                className={cx('info__gallery')}
                                            >
                                                {store?.player?.post?.media.map(
                                                    (data, index) => {
                                                        const count =
                                                            store?.player?.post
                                                                ?.media.length -
                                                            4;
                                                        if (
                                                            store?.player?.post
                                                                ?.media
                                                                .length === 1
                                                        ) {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        handleClick(
                                                                            data,
                                                                            index
                                                                        )
                                                                    }
                                                                    key={index}
                                                                    className={cx(
                                                                        'image__1'
                                                                    )}
                                                                >
                                                                    <img
                                                                        src={
                                                                            data
                                                                        }
                                                                        alt=''
                                                                    />
                                                                </div>
                                                            );
                                                        } else if (
                                                            store?.player?.post
                                                                ?.media
                                                                .length === 2
                                                        ) {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        handleClick(
                                                                            data,
                                                                            index
                                                                        )
                                                                    }
                                                                    key={index}
                                                                    className={cx(
                                                                        'image__2'
                                                                    )}
                                                                >
                                                                    <img
                                                                        src={
                                                                            data
                                                                        }
                                                                        alt=''
                                                                    />
                                                                </div>
                                                            );
                                                        } else if (
                                                            store?.player?.post
                                                                ?.media
                                                                .length === 3
                                                        ) {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className={cx(
                                                                        'image__3'
                                                                    )}
                                                                >
                                                                    <img
                                                                        onClick={() =>
                                                                            handleClick(
                                                                                data,
                                                                                index
                                                                            )
                                                                        }
                                                                        src={
                                                                            data
                                                                        }
                                                                        alt=''
                                                                    />
                                                                </div>
                                                            );
                                                        } else if (index < 3) {
                                                            return (
                                                                <img
                                                                    onClick={() =>
                                                                        handleClick(
                                                                            data,
                                                                            index
                                                                        )
                                                                    }
                                                                    key={index}
                                                                    src={data}
                                                                    alt=''
                                                                />
                                                            );
                                                        } else if (
                                                            index === 3
                                                        ) {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        handleClick(
                                                                            data,
                                                                            index
                                                                        )
                                                                    }
                                                                    key={index}
                                                                    className={cx(
                                                                        'image__more'
                                                                    )}
                                                                    style={{
                                                                        backgroundImage: `${
                                                                            count >
                                                                            0
                                                                                ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'
                                                                                : 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))'
                                                                        } , url(${data})`,
                                                                    }}
                                                                >
                                                                    <span
                                                                        className={cx(
                                                                            'image__count'
                                                                        )}
                                                                    >
                                                                        {count >
                                                                        0
                                                                            ? `+${count}`
                                                                            : ''}
                                                                    </span>
                                                                </div>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                )}
                                            </div>
                                        )
                                    )
                                ) : (
                                    albumGallery !== null && (
                                        <div className={cx('info__gallery')}>
                                            {albumGallery.map((data, index) => {
                                                const count =
                                                    albumGallery.length - 4;
                                                if (albumGallery.length === 1) {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                handleClick(
                                                                    data,
                                                                    index
                                                                )
                                                            }
                                                            key={index}
                                                            className={cx(
                                                                'image__1'
                                                            )}
                                                        >
                                                            <img
                                                                src={data}
                                                                alt=''
                                                            />
                                                        </div>
                                                    );
                                                } else if (
                                                    albumGallery.length === 2
                                                ) {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                handleClick(
                                                                    data,
                                                                    index
                                                                )
                                                            }
                                                            key={index}
                                                            className={cx(
                                                                'image__2'
                                                            )}
                                                        >
                                                            <img
                                                                src={data}
                                                                alt=''
                                                            />
                                                        </div>
                                                    );
                                                } else if (
                                                    albumGallery.length === 3
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cx(
                                                                'image__3'
                                                            )}
                                                        >
                                                            <img
                                                                onClick={() =>
                                                                    handleClick(
                                                                        data,
                                                                        index
                                                                    )
                                                                }
                                                                src={data}
                                                                alt=''
                                                            />
                                                        </div>
                                                    );
                                                } else if (index < 3) {
                                                    return (
                                                        <img
                                                            onClick={() =>
                                                                handleClick(
                                                                    data,
                                                                    index
                                                                )
                                                            }
                                                            key={index}
                                                            src={data}
                                                            alt=''
                                                        />
                                                    );
                                                } else if (index === 3) {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                handleClick(
                                                                    data,
                                                                    index
                                                                )
                                                            }
                                                            key={index}
                                                            className={cx(
                                                                'image__more'
                                                            )}
                                                            style={{
                                                                backgroundImage: `${
                                                                    count > 0
                                                                        ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'
                                                                        : 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))'
                                                                } , url(${data})`,
                                                            }}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    'image__count'
                                                                )}
                                                            >
                                                                {count > 0
                                                                    ? `+${count}`
                                                                    : ''}
                                                            </span>
                                                        </div>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </div>
                                    )
                                )}
                            </div>

                            {/* {albumGallery !== null && (
                                <div className={cx('info__gallery')}>
                                    {albumGallery.map((data, index) => {
                                        const count = albumGallery.length - 4;
                                        if (albumGallery.length === 1) {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        handleClick(data, index)
                                                    }
                                                    key={index}
                                                    className={cx('image__1')}
                                                >
                                                    <img src={data} alt='' />
                                                </div>
                                            );
                                        } else if (albumGallery.length === 2) {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        handleClick(data, index)
                                                    }
                                                    key={index}
                                                    className={cx('image__2')}
                                                >
                                                    <img src={data} alt='' />
                                                </div>
                                            );
                                        } else if (albumGallery.length === 3) {
                                            return (
                                                <div
                                                    key={index}
                                                    className={cx('image__3')}
                                                >
                                                    <img
                                                        onClick={() =>
                                                            handleClick(
                                                                data,
                                                                index
                                                            )
                                                        }
                                                        src={data}
                                                        alt=''
                                                    />
                                                </div>
                                            );
                                        } else if (index < 3) {
                                            return (
                                                <img
                                                    onClick={() =>
                                                        handleClick(data, index)
                                                    }
                                                    key={index}
                                                    src={data}
                                                    alt=''
                                                />
                                            );
                                        } else if (index === 3) {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        handleClick(data, index)
                                                    }
                                                    key={index}
                                                    className={cx(
                                                        'image__more'
                                                    )}
                                                    style={{
                                                        backgroundImage: `${
                                                            count > 0
                                                                ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'
                                                                : 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))'
                                                        } , url(${data})`,
                                                    }}
                                                >
                                                    <span
                                                        className={cx(
                                                            'image__count'
                                                        )}
                                                    >
                                                        {count > 0
                                                            ? `+${count}`
                                                            : ''}
                                                    </span>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            )} */}
                        </div>
                        {/* )} */}

                        <div
                            id={'rating__container'}
                            ref={ratingRef}
                            className={cx('container__box', 'info__rating')}
                        >
                            <div className={cx('title')}>Rating</div>
                            <div className={cx('rating')}>
                                <div className={cx('rating__item')}>
                                    <div className={cx('rating__item--avatar')}>
                                        <Image
                                            src={store?.player?.avatar || ''}
                                            alt=''
                                        />
                                    </div>
                                    <div
                                        className={cx('rating__item--content')}
                                    >
                                        <div className={cx('user')}>
                                            <div className={cx('header__user')}>
                                                <div
                                                    className={cx('user__name')}
                                                >
                                                    <span>
                                                        {store?.player?.name}
                                                    </span>
                                                    <div
                                                        className={cx(
                                                            'rating__time'
                                                        )}
                                                    >
                                                        8/3/2022, 6:14:45 PM
                                                    </div>
                                                </div>

                                                <div className={cx('ratings')}>
                                                    <div
                                                        className={cx(
                                                            'ratings__star'
                                                        )}
                                                    >
                                                        <i
                                                            className={cx(
                                                                'fa-solid',
                                                                'fa-star'
                                                            )}
                                                        ></i>
                                                        <i
                                                            className={cx(
                                                                'fa-solid',
                                                                'fa-star'
                                                            )}
                                                        ></i>
                                                        <i
                                                            className={cx(
                                                                'fa-solid',
                                                                'fa-star'
                                                            )}
                                                        ></i>
                                                        <i
                                                            className={cx(
                                                                'fa-solid',
                                                                'fa-star'
                                                            )}
                                                        ></i>
                                                        <i
                                                            className={cx(
                                                                'fa-solid',
                                                                'fa-star'
                                                            )}
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={cx('user__comment')}
                                            >
                                                In publishing and graphic
                                                design, Lorem ipsum is a
                                                placeholder text commonly used
                                                to demonstrate the visual form
                                                of a document or a typeface
                                                without relying on meaningful
                                                content. Lorem ipsum may be used
                                                as a placeholder before final
                                                copy is available.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;
