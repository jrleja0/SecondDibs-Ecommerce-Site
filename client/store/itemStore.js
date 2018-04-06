import axios from 'axios';

// ---------- ACTION TYPES ----------
const LOAD_ITEMS = 'LOAD_ITEMS';
const GET_ITEM = 'GET_ITEM';

// ---------- ACTION CREATORS ----------
const loadItems = itemData => ({ type: LOAD_ITEMS, itemData });
const getItem = item => ({ type: GET_ITEM, item });

// ---------- INIT STATE ----------
const initState = {
  items: [],
  totalItems: 0,
  item: {},
};

// ---------- DISPATCHERS ----------
export const fetchItems = payload =>
  dispatch =>
    axios.get(`/api/browse?start=${payload.start}`)
      .then(res => dispatch(loadItems(res.data || {} )))
      .catch(console.error.bind(console));

export const fetchItem = key =>
  dispatch =>
    axios.get(`/api/item/${key}`)
      .then(res => dispatch(getItem(res.data || {} )))
      .catch(console.error.bind(console));

// ---------- REDUCER ----------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {
    case LOAD_ITEMS:
      newState.items = action.itemData.items ?
        [...state.items, ...action.itemData.items]
        : state.items;
      newState.totalItems = action.itemData.totalItems ?
        action.itemData.totalItems
        : 0;
      break;

    case GET_ITEM:
      newState.item = action.item;
      break;

    default:
      return newState;
  }
  return newState;
}
