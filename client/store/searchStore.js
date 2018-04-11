import axios from 'axios';

// ---------- ACTION TYPES ----------
const GET_SEARCH_KEYWORDS = 'GET_SEARCH_KEYWORDS';
const GET_SEARCH_ITEMS = 'GET_SEARCH_ITEMS';

// ---------- ACTION CREATORS ----------
const loadSearchKeywords = keywords => ({ type: GET_SEARCH_KEYWORDS, keywords });
const loadSearchItems = items => ({ type: GET_SEARCH_ITEMS, items });

// ---------- INIT STATE ----------
const initState = {
  searchItems: [],
  searchKeywords: [],
};

// ---------- REDUCER ----------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {
    case GET_SEARCH_KEYWORDS:
      newState.searchKeywords = action.keywords;
      newState.searchKeywordNames = action.keywords.map(keyword => keyword.name);
      break;

    case GET_SEARCH_ITEMS:
      newState.searchItems = action.items;
      break;

    default:
      return newState;
  }
  return newState;
}

// ---------- DISPATCHERS ----------
export const fetchSearchKeywords = () =>
  dispatch =>
    axios.get('/api/search/keywords')
      .then(res => dispatch(loadSearchKeywords(res.data || [] )))
      .catch(console.error.bind(console));

export const fetchSearchItems = payload =>
  dispatch =>
    axios.get(`/api/search?keywords=${payload.searchKeywordsString}`)
      .then(res => dispatch(loadSearchItems(res.data || [] )))
      .catch(console.error.bind(console));
