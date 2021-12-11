import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {
    DELETE_INGREDIENT
} from '../../services/actions/action-types';

import styles from './constructor-item.module.css';

const ConstructorItem = (props) => {
    const { id, isBun, index, moveCard, start } = props;
    const ref = useRef(null);
    const dispatch = useDispatch();

    const onDelete = (e) => {
        const id = e.target.closest('li').dataset.id;
        dispatch({
            type: DELETE_INGREDIENT,
            id
        })
    }

    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredient',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item, monitor) => {
            if(!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            setTimeout(() => moveCard(dragIndex, hoverIndex));
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return(  
        isBun ? ( 
            <li className={`${styles.constructorItem} ${styles.bun}`}>
                { !start && <ConstructorElement {...props} /> }
            </li>
         ) : (      
            <li 
              className={`${styles.constructorItem} ${opacity}`} 
              data-id={id}
              data-handler-id={handlerId}
              ref={ref}>
                <div className={styles.settings}>
                    <DragIcon type={"primary"} />
                </div>
                <ConstructorElement {...props} handleClose={onDelete} />
            </li> 
        )                          
    )
} 

ConstructorItem.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    isBun: PropTypes.bool,
    isLocked: PropTypes.bool,
    moveCard: PropTypes.func,
    price: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    start: PropTypes.bool,
    type: PropTypes.string
}

export default ConstructorItem;