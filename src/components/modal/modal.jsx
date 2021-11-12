import React from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const Modal = (props) => {
    return (
        <div className={`${styles.modal} p-10 pb-15`}>
            <CloseIcon type="primary" />
            { props.children }
        </div>
    )
}

export default Modal;