import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import favoriteStore from './favoriteStore';
import itemStore from './itemStore';
import orderStore from './orderStore';
import searchStore from './searchStore';
import userStore from './userStore';

const reducer = combineReducers({ favoriteStore, itemStore, orderStore, searchStore, userStore });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from './favoriteStore';
export * from './itemStore';
export * from './orderStore';
export * from './searchStore';
export * from './userStore';
