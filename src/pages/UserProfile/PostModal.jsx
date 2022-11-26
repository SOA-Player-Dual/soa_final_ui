import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import imgbbApi from '@/api/imgbbApi';

import { CFormCheck } from '@coreui/react';

import { handlePostModal } from '@/_redux/features/modal/modalSlice';

import Modal from '@/components/Modal';
import Image from '@/components/Image';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const MAX_COUNT = 4;

function PostModal() {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state?.modal?.modalType.postModal);
    const user = useSelector((state) => state?.user?.user?.information);

    const [mediaOption, setMediaOption] = useState('video');

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const [previewPhotos, setPreviewPhotos] = useState([]);

    const [photosImgbb, setPhotosImgbb] = useState([]);
    const [videoLink, setVideoLink] = useState('');
    const [caption, setCaption] = useState('');

    console.log('Log post user: ', user.post);

    // console.log('check photos imgbb', photosImgbb);

    // console.log('check video link', videoLink);

    //     Upload multiple files
    const handleSetPreviewPhotos = (files) => {
        const previewPhotos = [];
        for (let i = 0; i < files.length; i++) {
            previewPhotos.push(URL.createObjectURL(files[i]));
        }
        setPreviewPhotos(previewPhotos);
    };

    const handleUploadFiles = (files) => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    toast.error(
                        `You can only add a maximum of ${MAX_COUNT} files`
                    );
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return false;
        });
        if (!limitExceeded) {
            setUploadedFiles(uploaded);
            handleSetPreviewPhotos(uploaded);
        }
    };

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadFiles(chosenFiles);
    };

    const handleUpdoadPhoto = async () => {
        const formPhotos = uploadedFiles.map((file) => {
            const form = new FormData();
            form.append('image', file);
            return form;
        });
        const photos = formPhotos.map((form) => {
            return imgbbApi.post('upload', form);
        });
        const res = await Promise.all(photos);
        let urlPhotos = res.map((r) => r?.data?.data?.display_url);
        setPhotosImgbb(urlPhotos);

        // const {data} =
    };

    const handleRemovePhoto = (index) => {
        const uploaded = [...uploadedFiles];
        uploaded.splice(index, 1);
        setUploadedFiles(uploaded);
        handleSetPreviewPhotos(uploaded);
    };

    // use handleUpdoadPhoto to upload photos to imgbb

    return (
        <Modal
            title='Add to information'
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
                        value={caption}
                        placeholder='Write something'
                        className={cx('content__text')}
                        onChange={(e) => setCaption(e.target.value)}
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
                            onChange={(e) => {
                                setMediaOption(e.target.value);
                                setPhotosImgbb([]);
                            }}
                            label='Video link (Youtube)'
                            defaultChecked
                        />
                        <CFormCheck
                            value={'photos'}
                            type='radio'
                            name='media'
                            id='photos'
                            label='Photos'
                            onChange={(e) => {
                                setMediaOption(e.target.value);
                                setVideoLink('');
                            }}
                        />
                    </div>

                    {previewPhotos && previewPhotos.length > 0 ? (
                        <div className={cx('previewer')}>
                            {previewPhotos.map((photo, index) => (
                                <div
                                    className={cx('previewer__item')}
                                    key={index}
                                    style={{ backgroundImage: `url(${photo})` }}
                                >
                                    <div
                                        className={cx('remove')}
                                        onClick={() => handleRemovePhoto(index)}
                                    >
                                        <i
                                            className={cx(
                                                'fa-regular fa-xmark'
                                            )}
                                        ></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    <div className={cx('feature__media')}>
                        {mediaOption === 'video' ? (
                            <div className={cx('input__video-link')}>
                                <i className={cx('fa-regular fa-paste')}></i>
                                <input
                                    value={videoLink}
                                    type='text'
                                    placeholder='Past your youtube link in here'
                                    onChange={(e) =>
                                        setVideoLink(e.target.value.trim())
                                    }
                                />
                            </div>
                        ) : (
                            <div className={cx('input__photo')}>
                                <label htmlFor='uploadPhotos'>
                                    <i
                                        className={cx(
                                            'fa-light fa-down-to-bracket'
                                        )}
                                    ></i>
                                    <p>Click to select file(s)</p>
                                </label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    id='uploadPhotos'
                                    onChange={handleFileEvent}
                                    disabled={fileLimit}
                                    hidden
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className={cx('footer')}>
                    <button onClick={handleUpdoadPhoto}>Post</button>
                </div>
            </div>
        </Modal>
    );
}

export default PostModal;
