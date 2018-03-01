import axios from 'axios;

//action types
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'

//action creators
export function getAllCategories(categories) {
  return {
    type: GET_ALL_CATEGORIES,
    categories
  };
}

export function addNewCategory(category) {
  return {
    type: ADD_NEW_CATEGORY,
    category
  };
}

//thunks

export function fetchCategories() {
  return function(dispatch) {
    axios
      .get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = getAllCategories(categories);
        dispatch(action);
      })
      .catch(err => console.error('error fetching categories', err));
  };
}

export function createCategory(category) {
  return function(dispatch) {
    axios
      .post('/api/categories', category)
      .then(res => res.data)
      .then(category => {
        const action = addNewCategory(category);
        dispatch(action);
      })
      .catch(err => console.error('error creating category', err));
  };
}

//reducer
export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    case ADD_NEW_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
}
