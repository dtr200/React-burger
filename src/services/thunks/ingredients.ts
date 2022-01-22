import { Dispatch } from 'redux';
import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/action-types';

import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';

export const getIngredients = (ingredientsURL: string) => {
    return async (dispatch: Dispatch) => {
        try{
            dispatch({ 
                type: GET_INGREDIENTS_REQUEST 
            });
            const res = await fetch(`${BASE_URL}${ingredientsURL}`);
            const json = await checkResponse(res);

            dispatch({ 
                type: GET_INGREDIENTS_SUCCESS, 
                ingredients: json.data
            });
        }
        catch(err){
            dispatch({ 
                type: GET_INGREDIENTS_FAILED
            }); 
        }
    }    
}