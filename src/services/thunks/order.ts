import { Dispatch } from 'redux';
import {
    SET_MODAL_DATA,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
} from '../actions/action-types';

import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { TProductItem } from '../../utils/types';

export const sendOrder = (orderURL: string, constructorIngredients: Array<TProductItem>) => {
    return async (dispatch: Dispatch) => {
        const orderBody = {
            ingredients: constructorIngredients.map((product: TProductItem) => product._id)
        };
        try{
            dispatch({
                type: SEND_ORDER_REQUEST
            })
            const res = await fetch(`${BASE_URL}${orderURL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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