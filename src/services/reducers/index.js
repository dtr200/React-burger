import { combineReducers } from "redux";
import {
    ingredients,
    ingredientsNav,
    modal,
    order
} from './reducer';

const rootReducer = combineReducers({
    ingredients,
    ingredientsNav,
    modal,
    order
});

export default rootReducer;