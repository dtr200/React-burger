import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import IngredientIcon from '../ingredient-icon/ingredient-icon';

import { CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.css';

type TOrderBlockProps = {
    number: number;
    createdAt: string;
    name: string;
    status: string;
    ingredients: string[];
    nostatus: boolean;
}

const OrderBlock: FunctionComponent<TOrderBlockProps> = 
    ({ number, name, createdAt, status, ingredients, nostatus }) => {

    const { ingredientsData } = useSelector((store: any) => store.ingredients);

    const price = ingredients.reduce((accum: number, id: string) => 
        accum + ingredientsData.find((item: any) => item._id === id).price, 0);

    const images = Array.from(
        new Set(
            ingredients.map((id: string) =>
                ingredientsData.find((item: any) => item._id === id).image_mobile)
            )
        ).sort();
    
    const getTime = () => {
        const created = new Date(createdAt);
        const time = `${created.getHours()}:${
            created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes()
        }`;

        const todayDate = new Date();
        const msInDay = 24 * 3600 * 1000;

        const digitsToWords = ['Сегодня', 'Вчера'];
        const daysBefore = Math.floor((todayDate.getTime() - created.getTime())/msInDay);

        const getDayForm = (day: number): string => {
            return day % 10 === 1 ? 'день' :
                day % 10 >= 2 && day % 10 <= 4 && day !== 12 && day !== 13 && day !== 14 ? 
                'дня' : 'дней'; 
        }

        const getDay = () => {
            return daysBefore < 2 ? 
                digitsToWords[daysBefore] : 
                `${daysBefore} ${getDayForm(daysBefore)} назад`;
        }

        return `${getDay()} ${time} i-GMT+3`;
    }
    
    return (
        <li className={`${styles.orderBlock} text text_type_digits-default`}>
            <div className={styles.meta}>
                <span className={``}>{`#${number}`}</span>
                <span className={`${styles.date} text_type_main-default`}>{getTime()}</span>
            </div>
            <h2 className={`${styles.title} text_type_main-medium`}>{name}</h2>
            <p className={styles.status}>{!nostatus && status}</p>
            <div className={styles.info}>
                <ul className={styles.icons}>
                    {
                        images.map((image: string, i: number) => {
                            if(i >= 6) return;
                            return (
                                <IngredientIcon 
                                    image={image} 
                                    key={i} 
                                    shiftRatio={i} 
                                    rest={i === 5 && images.length - 6} />
                            )
                        })
                    }
                </ul>
                <div className={styles.priceBlock}>
                    <span className={styles.price}>{price}</span>
                    <CurrencyIcon type="secondary" />
                </div>
            </div>
        </li>
    )
}

export default OrderBlock;