import React from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const root = document.getElementById('react-modals');

const Modal = ({ title, onClose, children }) => {

    const handleKeyPress = (e) => {
        if(e.key === 'Escape')
            onClose();
    }

    const content = (
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${styles.modal} p-10 pb-15`} 
                 onKeyDown={handleKeyPress} tabIndex='0'>                
                <div className={styles.titleContainer}>
                    <h3 className='text text_type_main-medium pr-15'>
                        { title }
                    </h3>
                    <CloseIcon onClick={onClose} type="primary" />
                </div>            
                { children }
            </div>
        </>
    )
    return ReactDOM.createPortal(content, root);
}

export default Modal;