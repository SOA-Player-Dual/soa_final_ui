import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { CFormCheck } from '@coreui/react';

import { handlePostModal } from '@/_redux/features/modal/modalSlice';

import Modal from '@/components/Modal';
import Image from '@/components/Image';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function PostModal() {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state?.modal?.modalType.postModal);
    const user = useSelector((state) => state?.user?.user?.information);

    const [mediaOption, setMediaOption] = useState('video');
    const [photoForm, setPhotosForm] = useState(false);
    const [videoForm, setVideoForm] = useState(false);

    useEffect(() => {
        // setForm
        if (mediaOption === 'photos') {
            setPhotosForm(true);
            setVideoForm(false);
        }
        if (mediaOption === 'video') {
            setPhotosForm(false);
            setVideoForm(true);
        }
    }, [mediaOption]);

    console.log('Check media option', mediaOption);

    return (
        <Modal
            title='Post'
            show={modal}
            close={() => dispatch(handlePostModal(false))}
            size='medium'
        >
            <div className={cx('post__modal')}>
                <div className={cx('heading')}>
                    <div className={cx('heading__avatar')}>
                        {user?.avatar && user?.avatar.length > 0 ? (
                            <img src={user?.avatar} alt='avatar' />
                        ) : (
                            <Image src='' alt='avatar' />
                        )}
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('info__name')}>Ton Duc Thang</span>
                        <span className={cx('info__faculty')}>Faculty</span>
                    </div>
                </div>

                <div className={cx('content')}>
                    <textarea
                        placeholder='Write something'
                        className={cx('content__text')}
                    ></textarea>
                </div>

                <div className={cx('feature')}>
                    <div className={cx('feature__option')}>
                        <span>Media option</span>
                        <CFormCheck
                            value={'video'}
                            type='radio'
                            name='media'
                            id='video'
                            onChange={(e) => setMediaOption(e.target.value)}
                            label='Video link (Youtube)'
                            defaultChecked
                        />
                        <CFormCheck
                            value={'photos'}
                            type='radio'
                            name='media'
                            id='photos'
                            label='Photos'
                            onChange={(e) => setMediaOption(e.target.value)}
                        />
                    </div>

                    <div className={cx('feature__media')}>
                        {mediaOption === 'video' ? (
                            <div className={cx('input__video-link')}>
                                <i className={cx('fa-regular fa-paste')}></i>
                                <input
                                    type='text'
                                    placeholder='Past your youtube link in here'
                                />
                            </div>
                        ) : (
                            <span>Upload imge</span>
                        )}
                    </div>
                </div>

                <div className={cx('footer')}>
                    <button>Post</button>
                </div>
            </div>
        </Modal>
    );
}

export default PostModal;
