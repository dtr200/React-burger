import { combineReducers } from "redux";
import ingredients from './ingredients';
import order from './order';
import modal from './modal';

const rootReducer = combineReducers({
    ingredients,
    modal,
    order
});

export default rootReducer;