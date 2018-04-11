import axios from 'axios';

// ---------- ACTION TYPES ----------
const LOAD_FAVORITES = 'LOAD_FAVORITES';
const GET_FAVORITE = 'GET_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// ---------- ACTION CREATORS ----------
const loadFavorites = (items, itemKeys) => ({ type: LOAD_FAVORITES, items, itemKeys });
const getFavorite = itemKey => ({ type: GET_FAVORITE, itemKey });
const removeFavorite = itemKey => ({ type: REMOVE_FAVORITE, itemKey });

// ---------- INIT STATE ----------
const initState = {
  favoriteItems: [],
  favoriteItemKeys: {},
};

// ---------- REDUCER ----------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {
    case LOAD_FAVORITES:
      newState.favoriteItems = action.items;
      newState.favoriteItemKeys = action.itemKeys;
      break;

    case GET_FAVORITE:
      newState.favoriteItemKeys = Object.assign({},
        state.favoriteItemKeys,
        {[action.itemKey]: true});
      break;

    case REMOVE_FAVORITE:
      newState.favoriteItemKeys = Object.keys(state.favoriteItemKeys)
        .reduce((newObj, key) => {
          if (key !== action.itemKey) {
            newObj[key] = true;
          }
          return newObj;
        }, {});
      break;

    default:
    return newState;
}
  return newState;
}

// ---------- DISPATCHERS ----------
const createFavoriteKeysMap = itemsArr => {
  return itemsArr.reduce((map, item) => {
    map[item.key] = true;
    return map;
  }, {});
};

export const fetchFavorites = () =>
  dispatch =>
    axios.get('/api/favorite/items')
      .then(res => {
        const items = res.data || [];
        const itemKeys = createFavoriteKeysMap(res.data) || {};
        dispatch(loadFavorites(items, itemKeys));
      })
      .catch(console.error.bind(console));

export const addFavorite = itemKey =>
  dispatch =>
    axios.post(`/api/favorite/add/${itemKey}`)
      .then(() =>
        dispatch(getFavorite(itemKey)))
      .catch(console.error.bind(console));

export const deleteFavorite = itemKey =>
  dispatch =>
    axios.delete(`/api/favorite/delete/${itemKey}`)
    .then(() =>
      dispatch(removeFavorite(itemKey)))
    .catch(console.error.bind(console));
