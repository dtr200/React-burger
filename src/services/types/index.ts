import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TAccessAction } from '../actions/access';
import { TIngredientsAction } from '../actions/ingredients';
import { TModalAction } from '../actions/modal';
import { TOrderAction } from '../actions/order';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = 
    TAccessAction |
    TIngredientsAction |
    TModalAction |
    TOrderAction;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;