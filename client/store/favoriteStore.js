import axios from 'axios';

// ---------- ACTION TYPES ----------
const LOAD_FAVORITES = 'LOAD_FAVORITES';
const GET_FAVORITE = 'GET_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// ---------- ACTION CREATORS ----------
const loadFavorites = items => ({ type: LOAD_FAVORITES, items});
const getFavorite = id => ({ type: GET_FAVORITE, id });
const removeFavorite = id => ({ type: REMOVE_FAVORITE, id });

// ---------- INIT STATE ----------
const initState = {
  favoriteItems: [],
};

// ---------- DISPATCHERS ----------
export const fetchFavorites = () =>
  dispatch =>
    Promise.all([
      axios.get('/api/browse?start=0&limit=1000'),
      axios.get('/api/session/favorites')
    ])
      .then(([resItems, resFavoriteItemIDs]) => [resItems.data.items, resFavoriteItemIDs.data])
      .then(([items, favoriteItemIDs]) => {
        return items.filter(item => {
          return favoriteItemIDs.includes(item.id);
        });
      })
      .then(favoriteItems => dispatch(loadFavorites(favoriteItems || [] )))
      .catch(console.error.bind(console));

export const addFavorite = id =>
  dispatch =>
    axios.post(`/api/session/addFavorite/${id}`)
      .then(() => dispatch(getFavorite(id)))
      .catch(console.error.bind(console));

export const deleteFavorite = id =>
  dispatch =>
    axios.delete(`/api/session/deleteFavorite/${id}`)
      .then(() => dispatch(removeFavorite(id)))
      .catch(console.error.bind(console));

// ---------- REDUCER ----------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  let favorite;
  switch (action.type) {
    case LOAD_FAVORITES:
      newState.favoriteItems = action.items
      break;

    case GET_FAVORITE:
      const addFavorite = item => {
        if (item.id === action.id) {
          item.favorite = true;
        }
        return item;
      };
      newState.items = newState.items.map(addFavorite); // updates newState.items
      newState.favoriteItems = newState.favoriteItems.map(addFavorite); // updates newState.favoriteItems
      newState.searchItems = newState.searchItems.map(addFavorite); // updates newState.searchItems
      favorite =  // updates newState.item
        newState.item.id === action.id ?
        true : newState.item.favorite;
      newState.item = Object.assign({}, newState.item, { favorite });
      break;

    case REMOVE_FAVORITE:
      const deleteFavorite = item => {
        if (item.id === action.id) {
          item.favorite = false;
        }
        return item;
      };
      newState.items = newState.items.map(deleteFavorite); // updates newState.items
      newState.favoriteItems = newState.favoriteItems.map(deleteFavorite); // updates newState.favoriteItems
      newState.searchItems = newState.searchItems.map(deleteFavorite); // updates newState.searchItems
      favorite =  // updates newState.item
        newState.item.id === action.id ?
        false : newState.item.favorite;
      newState.item = Object.assign({}, newState.item, { favorite });
      break;

    default:
      return newState;
  }
  return newState;
}
