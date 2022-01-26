import React, { useEffect, FunctionComponent } from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const root = document.getElementById('react-modals')!;

type TModalProps = {
    onClose: () => void;
}

const Modal: FunctionComponent<TModalProps> = ({ children, onClose }) => {
  
    const handleKeyPress: (e: KeyboardEvent) => void = (e) => {
        if(e.key === 'Escape')
            onClose();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => 
            document.removeEventListener('keydown', handleKeyPress);
    })

    const content = (
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${styles.modal} p-10 pb-15`} tabIndex={0}>
                <div className={styles.close}>
                    <CloseIcon onClick={onClose} type="primary" />       
                </div>               
                { children }
            </div>
        </>
    )
    return ReactDOM.createPortal(content, root);
}

export default Modal;