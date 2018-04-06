import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import itemStore from './itemStore';
import favoriteStore from './favoriteStore';
import searchStore from './searchStore';

const reducer = combineReducers({ itemStore, favoriteStore, searchStore });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from './itemStore';
export * from './favoriteStore';
export * from './searchStore';
