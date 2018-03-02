import axios from 'axios'

//action types
const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'

//action creators
export function getAllUsers(users) {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

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
      .get('/api/users', user)
      .then(user => {
        dispatch(addUser(user));
      })
      .catch(err => console.error("error creating user", err));
  }
}

export function editUser(id, user) {
  return dispatch => {
    axios
      .put(`/api/users/${id}`, user)
      .then(user => {
        dispatch(updateUser(user));
      })
      .catch(err => console.error("error updating user", err));
  }
}


//reducer
export default function usersReducer(state = [], action) {
  switch(action.type) {
    case GET_ALL_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));
    default:
      return state;
  }
}
