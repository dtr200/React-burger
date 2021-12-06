import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CONSTRUCTOR_INGREDIENTS
} from '../../utils/action-types';

const initialIngredientsState = {
    ingredientsRequest: true,
    ingredientsFailed: false,
    ingredientsData: [],
    constructorIngredients: [],
    currentIngredient: {}
}

export const ingredients = (state = initialIngredientsState, action) => {
    switch(action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsData: action.ingredients,
                constructorIngredients: action.constructorIngredients,
                ingredientsRequest: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        default: return state;
    }
}

export const getIngredients = (ingredientsURL, defaultCart) => {
    return async (dispatch) => {
        try{
            dispatch({ 
                type: GET_INGREDIENTS_REQUEST 
            });
            const res = await fetch(ingredientsURL);
            const json = await res.json();
            
            const products = [];
            json.data.forEach(item => {
              for(let i = 0; i < defaultCart.length; i++){
                if(defaultCart[i].id === item._id)
                  products.push(
                    { item, pcs: defaultCart[i].pcs }
                  );
              }
            });
            dispatch({ 
                type: GET_INGREDIENTS_SUCCESS, 
                ingredients: json.data,
                constructorIngredients: products
            });
        }
        catch(err){
            dispatch({ 
                type: GET_INGREDIENTS_FAILED
            }); 
        }
    }    
}

const initialOrderState = {
    currentOrder: {}
};

export const order = (state = initialOrderState, action) => {
    switch(action.type){
        case '': {
            return {

            }
        }
        default:
            return state;
    }
}