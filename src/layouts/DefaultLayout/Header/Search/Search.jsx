import { useEffect, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '@/components/Popper';
import { useDebounce } from '@/hooks';
import classNames from 'classnames/bind';
import axios from 'axios';

// import { search } from '~/services/searchService';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setsearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [formSearchResponsive, setFormSearchResponsive] = useState(false);

    console.log(formSearchResponsive);

    const handleClick = {
        openSearchResponsive: () => {
            setFormSearchResponsive((prev) => !prev);
        },
    };

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounce.trim()) {
            return;
        }

        const fetchApi = async () => {
            const result = await axios.get(
                'https://jsonplaceholder.typicode.com/users/',
                debounce
            );
            setsearchResult(result.data);
        };

        fetchApi();
    }, [debounce]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValueTo = e.target.value;
        if (!searchValueTo.startsWith(' ')) {
            setSearchValue(searchValueTo);
        }
    };

    return (
        <>
            <div className={cx('search__main')}>
                <TippyHeadless
                    interactive
                    visible={showResult && searchResult.length > 0}
                    onClickOutside={handleHideResult}
                    render={(attrs) => (
                        <PopperWrapper>
                            <div
                                className={cx('search__result')}
                                tabIndex='-1'
                                {...attrs}
                            >
                                <h4 className={cx('search__result-title')}>
                                    Account
                                </h4>
                                {searchResult.map((result) => {
                                    return (
                                        <>
                                            <p>{result.id}</p>
                                        </>
                                    );
                                })}
                            </div>
                        </PopperWrapper>
                    )}
                >
                    <div className={cx('search')}>
                        {!!searchValue || (
                            <i
                                className={cx('fa-regular fa-magnifying-glass')}
                            ></i>
                        )}

                        <input
                            value={searchValue}
                            className={cx('search__input')}
                            placeholder='Search something...'
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                        />
                    </div>
                    {/* 
                    <div className={cx('search__responsive')}>
                        <i className={cx('fa-regular fa-magnifying-glass')}></i>
                    </div> */}
                </TippyHeadless>
            </div>

            <div className={cx('search__responsive')}>
                <div
                    className={cx('icon__search')}
                    onClick={handleClick.openSearchResponsive}
                >
                    <i className={cx('fa-regular fa-magnifying-glass')}></i>
                </div>

                {formSearchResponsive && (
                    <div className={cx('search__responsive-container')}>
                        <TippyHeadless
                            interactive
                            visible={showResult && searchResult.length > 0}
                            onClickOutside={handleHideResult}
                            render={(attrs) => (
                                <PopperWrapper>
                                    <div
                                        className={cx('search__result')}
                                        tabIndex='-1'
                                        {...attrs}
                                    >
                                        <h4
                                            className={cx(
                                                'search__result-title'
                                            )}
                                        >
                                            Account
                                        </h4>
                                        {searchResult.map((result) => {
                                            return (
                                                <>
                                                    <p>{result.id}</p>
                                                </>
                                            );
                                        })}
                                    </div>
                                </PopperWrapper>
                            )}
                        >
                            <div className={cx('search')}>
                                {!!searchValue || (
                                    <i
                                        className={cx(
                                            'fa-regular fa-magnifying-glass'
                                        )}
                                    ></i>
                                )}

                                <input
                                    value={searchValue}
                                    className={cx('search__input')}
                                    placeholder='Search something...'
                                    onChange={handleChange}
                                    onFocus={() => setShowResult(true)}
                                />
                            </div>
                            {/* 
                            <div className={cx('search__responsive')}>
                                <i className={cx('fa-regular fa-magnifying-glass')}></i>
                            </div> */}
                        </TippyHeadless>
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;
