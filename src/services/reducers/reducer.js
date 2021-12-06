import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,  
    SET_MODAL_DATA,
    SET_MODAL_ERROR,
    CLOSE_MODAL,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED
} from '../actions/action-types';

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

const initialModalState = {
    modalType: null,
    modalMode: null, 
    modalTitle: null,
    modalData: {},
    hasModalError: false,
    modalVisible: false
}

export const modal = (state = initialModalState, action) => {
    switch(action.type){
        case SET_MODAL_DATA: {
            return {
                ...state,
                modalMode: action.mode,
                modalTitle: action.title,
                modalData: action.data,
                modalVisible: true,
                hasModalError: false
            }
        }
        case SET_MODAL_ERROR: {
            return {
                ...state,
                hasModalError: true
            }
        }
        case CLOSE_MODAL: {
            console.log('CLOSE')
            return {
                ...state,
                modalVisible: false
            }
        }
        default:
            return state;
    }
}

const initialOrderState = {
    orderRequest: false,
    orderData: {},
    orderFailed: false,
};

export const order = (state = initialOrderState, action) => {
    switch(action.type){
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderData: action.order,
                orderFailed: false,
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        default:
            return state;
    }
}

export const sendOrder = (orderURL, constructorIngredients) => {
    return async (dispatch) => {       
        
        const orderBody = {
            ingredients: constructorIngredients.map(product => product.item._id)
        };
        
        try{
            dispatch({
                type: SEND_ORDER_REQUEST
            })
            const res = await fetch(orderURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderBody)
            });
    
            if(!res.ok)
                dispatch({
                    type: SEND_ORDER_FAILED
                });

            const data = await res.json();

            dispatch({ 
                type: SEND_ORDER_SUCCESS,
                order: data
            });
        }
        catch(err){
            dispatch({
                type: SEND_ORDER_FAILED
            });
        }
    }
}