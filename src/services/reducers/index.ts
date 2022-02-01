import { combineReducers } from "redux";
import ingredients from './ingredients';
import order from './order';
import modal from './modal';
import access from './access';
import ws from './ws';

const rootReducer = combineReducers({
    ingredients,
    modal,
    order,
    access,
    ws
});

export default rootReducer;