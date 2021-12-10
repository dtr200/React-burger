import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from "react-redux";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { CloseIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import {
    CLOSE_MODAL,
    RESET_CURRENT_INGREDIENT,
    RESET_ORDER_REQUEST
} from '../../services/actions/action-types';

import styles from './modal.module.css';

const root = document.getElementById('react-modals');

const Modal = ({ children }) => {

    const {
        modalTitle
      } = useSelector(store => store.modal);

    const dispatch = useDispatch();

    const onClose = () => {
        console.log('close')
        dispatch({ type: CLOSE_MODAL });
        dispatch({ type: RESET_CURRENT_INGREDIENT });
        dispatch({ type: RESET_ORDER_REQUEST });
    }

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
                <div className={styles.titleContainer}>
                    <h3 className='text text_type_main-large pr-15'>
                        { modalTitle }
                    </h3>
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
}

export default Modal;