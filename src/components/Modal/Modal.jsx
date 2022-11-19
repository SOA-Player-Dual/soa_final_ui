import { useRef, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ title, children, show, close, size }) {
    const modalRef = useRef();

    const keyProp = useCallback(
        (e) => {
            if (e.key === 'Escape' && show) {
                close(false);
            }
        },
        [close, show]
    );

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            close(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keyProp);
        return () => document.removeEventListener('keydown', keyProp);
    });

    // Disable scroll when modal is open
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        }
        return () => (document.body.style.overflow = 'unset');
    }, [show]);

    return (
        <>
            {show ? (
                <div
                    className={cx('wrapper')}
                    ref={modalRef}
                    onClick={closeModal}
                >
                    <div
                        // set width modal auto or 100%
                        className={cx('container', {
                            large: size === 'large',
                            medium: size === 'medium',
                            small: size === 'small',
                        })}
                        // style={{ width: `${setWidthModal}` }}
                    >
                        <div className={cx('heading')}>
                            <div className={cx('title')}>{title}</div>
                            <span
                                className={cx('close')}
                                onClick={() => close(false)}
                            >
                                <li className={cx('fa-light', 'fa-xmark')}></li>
                            </span>
                        </div>
                        <div className={cx('content')}>{children}</div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Modal;
