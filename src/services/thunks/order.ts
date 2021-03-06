import { Dispatch } from 'redux';
import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
} from '../action-constants/order';
import { SET_MODAL_DATA } from '../action-constants/modal';

import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { TProductItem } from '../../utils/types';
import { AppThunk, AppDispatch } from '../types';

export const sendOrder: AppThunk = (orderURL, constructorIngredients) => {
    return async (dispatch: AppDispatch) => {
        const orderBody = {
            ingredients: constructorIngredients.map((product: TProductItem) => product._id)
        };
        try{
            dispatch({
                type: SEND_ORDER_REQUEST
            })
            const accessToken: string = 
            document.cookie.match(/(accessToken=)(.+)/)![2];

            const res = await fetch(`${BASE_URL}${orderURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken 
                },
                body: JSON.stringify(orderBody)
            });

            const data = await checkResponse(res);

            dispatch({ 
                type: SEND_ORDER_SUCCESS,
                data
            });
            dispatch({ 
                type: SET_MODAL_DATA,
                mode: 'order',
                title: '',
                data
            });
        }
        catch(err){
            dispatch({
                type: SEND_ORDER_FAILED
            });
        }
    }
}