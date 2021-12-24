import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { CloseIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const root = document.getElementById('react-modals');

const Modal = ({ children, onClose }) => {

    const {
        modalTitle
      } = useSelector(store => store.modal);
    console.log(modalTitle)
    const handleKeyPress = (e) => {
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
            <div className={`${styles.modal} p-10 pb-15`} 
                 onKeyDown={handleKeyPress} tabIndex='0'>
                <div className={styles.close}>
                    <CloseIcon onClick={onClose} type="primary" />       
                </div>               
                { children }
            </div>
        </>
    )
    return ReactDOM.createPortal(content, root);
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;