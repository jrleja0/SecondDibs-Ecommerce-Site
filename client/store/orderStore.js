import axios from 'axios';
import history from '../history';

// ---------- ACTION TYPES ----------
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';
const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER';
const ADD_ITEM_AND_FIND_OR_CREATE_ORDER = 'ADD_ITEM_AND_FIND_OR_CREATE_ORDER';
const DELETE_ITEM_FROM_ORDER = 'DELETE_ITEM_FROM_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const SUBMIT_ORDER = 'SUBMIT_ORDER';

// ---------- ACTION CREATORS ----------
const getOrderHistory = orders => ({ type: GET_ORDER_HISTORY, orders });
const getCurrentOrder = order => ({ type: GET_CURRENT_ORDER, order });
const addItemToFoundOrCreatedOrder = updatedOrder => ({ type: ADD_ITEM_AND_FIND_OR_CREATE_ORDER, updatedOrder });
const deleteItemFromOrder = updatedOrder => ({ type: DELETE_ITEM_FROM_ORDER, updatedOrder });
const deleteOrder = orderId => ({ type: DELETE_ORDER, orderId });
const submitOrder = orderId => ({ type: SUBMIT_ORDER, orderId });

// ---------- INIT STATE ----------
const initState = {
  current: {},
  history: [],
};

// ---------- REDUCER ----------
export default function (state = initState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_ORDER_HISTORY:
      newState.history = action.orders;
      return newState;

    case GET_CURRENT_ORDER:
      newState.current = action.order;
      return newState;

    case ADD_ITEM_AND_FIND_OR_CREATE_ORDER:
      newState.current = action.updatedOrder;
      return newState;

    case DELETE_ITEM_FROM_ORDER:
      newState.current = action.updatedOrder;
      return newState;

    case DELETE_ORDER:
      newState.current = {};
      return newState;

    case SUBMIT_ORDER:
      newState.current = {};
      return newState;

    default:
      return newState;
  }
}

// ---------- DISPATCHERS ----------
export const fetchOrderHistory = () =>
  dispatch =>
    axios.get('/api/order/user/history')
      .then(res =>
        dispatch(getOrderHistory(res.data)))
      .catch(err => console.error('Fetching order history unsuccessful', err));

export const fetchCurrentOrder = () =>
  dispatch =>
    axios.get('/api/order')
      .then(res => {
        if (res.data) {
          dispatch(getCurrentOrder(res.data));
        } else {
          dispatch({type: 'RESET'});
        }
      })
      .catch(err => console.error('Fetching current order unsuccessful', err));

export const addItem = (itemId, userId, orderId) =>
  dispatch =>
    axios.post(`/api/order/item/${itemId}`, {userId, orderId})
      .then(res =>
        dispatch(addItemToFoundOrCreatedOrder(res.data)))
      .then(() =>
        history.push('/cart'))
      .catch(err => console.error('Adding item unsuccessful', err));

export const removeItem = itemId =>
  dispatch =>
    axios.delete(`/api/order/item/${itemId}`)
      .then(res =>
        dispatch(deleteItemFromOrder(res.data)))
      .catch(err => console.error('Deleting item unsuccessful', err));

export const updateDeleteOrder = orderId =>
  dispatch =>
    axios.delete(`/api/order/cart/${orderId}`)
      .then(res =>
        dispatch(deleteOrder(res.data)))
      .catch(err => console.error('Deleting cart unsuccessful', err));

export const updateSubmitOrder = (orderId, token) =>
  dispatch =>
    axios.put(`/api/order/cart/${orderId}`, {token})
      .then(res =>
        dispatch(submitOrder(res.data)))
      .then(() =>
        history.push('/order/success'))
      .catch(err => {
        console.error('Submitting order unsuccessful', err);
        return history.push('order/unsuccessful');
      });
