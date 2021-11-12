import React from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const Modal = ({ title, children }) => {
    return (
        <div className={`${styles.modal} p-10 pb-15`}>
            <h3 className='text text_type_main-medium pr-15'>{ title }</h3>
            <CloseIcon type="primary" />
            { children }
        </div>
    )
}

export default Modal;