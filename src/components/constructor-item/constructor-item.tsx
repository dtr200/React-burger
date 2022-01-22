import React, { useRef, FunctionComponent, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import {
    DELETE_INGREDIENT
} from '../../services/actions/ingredients';

import styles from './constructor-item.module.css';

type TConstructorItemProps = {
    id?: string;
    index: number;
    isBun: boolean;
    isLocked: boolean;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    price: number;
    text: string;
    thumbnail: string;
    start?: boolean;
    type?: 'top' | 'bottom';
};

type TItemDropHover = {
    id: string;
    index: number
};

const ConstructorItem: FunctionComponent<TConstructorItemProps> = (props) => {
    const { id, isBun, index, moveCard, start } = props;
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    
    const onDelete: (id: string | undefined) => void = (id) => {
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
        hover: (item: TItemDropHover, monitor) => {
            if(!ref.current) return;

            const dragIndex: number = item.index;
            const hoverIndex: number = index;
            if(dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY: number = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            if(moveCard)
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

    const opacity: number = isDragging ? 0 : 1;
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
                <ConstructorElement {...props} handleClose={() => onDelete(id)} />
            </li> 
        )                          
    )
}

export default ConstructorItem;