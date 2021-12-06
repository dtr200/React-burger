import React from "react";
import { useDispatch } from "react-redux";
import {
    CLOSE_MODAL
} from '../../services/actions/action-types';


import styles from './modal-overlay.module.css';

const ModalOverlay = () => {

    const dispatch = useDispatch();
    const onClose = () =>
        dispatch({ type: CLOSE_MODAL });

    return (
        <div 
            className={styles.overlay} 
            onClick={onClose}>
        </div>
    )
}

export default ModalOverlay;