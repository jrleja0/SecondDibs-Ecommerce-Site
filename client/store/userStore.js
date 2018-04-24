import axios from 'axios';
import history from '../history';

// ---------- ACTION TYPES ----------
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// ---------- ACTION CREATORS ----------
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// ---------- INIT STATE ----------
const initState = {};

// ---------- REDUCER ----------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {
    case GET_USER:
      return action.user;

    case REMOVE_USER:
      return initState;

    default:
      return newState;
  }
}

// ---------- DISPATCHERS ----------
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => dispatch(getUser(res.data || initState)))
      .catch(console.error.bind(console));

export const auth = (method, email, password, name) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, name })
      .then(res =>
        dispatch(getUser(res.data)))
      .then((user) => {
        history.push('/browse');
        return user;
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logOut = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(() =>
        dispatch(removeUser()))
      .then(() =>
        history.push('/browse'))
      .catch(console.error.bind(console));

export const fetchUser = user =>
  dispatch =>
    axios.get(`/api/user/${user.id}`)
      .then(res => {
        dispatch(getUser(res.data));
      })
      .catch(console.error.bind(console));
