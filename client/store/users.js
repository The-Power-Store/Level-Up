import axios from 'axios'

//action types
const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'
const DELETE_USER = 'DELETE_USER'


//action creators
const getAllUsers = users => ({type: GET_ALL_USERS, users});
const addUser = user => ({type: ADD_USER, user});
const deleteUser = id => ({type:DELETE_USER, id});


//thunk creators
export function fetchAllUsers() {
  return dispatch => {
    axios
      .get('/api/users')
      .then(res => res.data)
      .then(users => {
        dispatch(getAllUsers(users));
      })
      .catch(err => console.error("error fetching users", err));
  }
}

export function createUser(user) {
  return dispatch => {
    axios
      .post('/api/users', user)
      .then(res => res.data)
      .then(user => {
        dispatch(addUser(user));
      })
      .catch(err => console.error("error creating user", err));
  }
}

export function deleteAccount(id) {
  return dispatch => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        dispatch(deleteUser(id));
      })
      .catch(err => console.error("error deleting user", err));
  };
}


//reducer
export default function usersReducer(state = [], action) {
  switch(action.type) {
    case GET_ALL_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    case DELETE_USER:
      return state.filter(user => (
        action.id !== user.id
      ));
    default:
      return state;
  }
}
