import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import {
    DELETE_INGREDIENT
} from '../../services/actions/action-types';

import styles from './constructor-item.module.css';

const ConstructorItem = (props) => {
    const { id, isBun } = props;

    const dispatch = useDispatch();

    const onDelete = (e) => {
        const id = e.target.closest('li').dataset.id;
        dispatch({
            type: DELETE_INGREDIENT,
            id
        })
    }

    return(  
        isBun ? (
            <li className={styles.constructorItem}>
                <ConstructorElement {...props} />
            </li>
        ) : (      
            <li className={styles.constructorItem} data-id={id}>
                <div className={styles.settings}>
                    <DragIcon type={"primary"} />
                </div>
                <ConstructorElement {...props} handleClose={onDelete} />
            </li> 
        )                          
    )
} 

export default ConstructorItem;