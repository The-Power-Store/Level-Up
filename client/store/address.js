import axios from 'axios'

//action types
const GET_ADDRESS = 'GET_ADDRESS'
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS'


//action creators
const getAddress = address => ({type: GET_ADDRESS, address});
const updateAddress = address => ({type: UPDATE_ADDRESS, address});
const addNewAddress = address => ({type: ADD_NEW_ADDRESS, address});


//thunk creators
export function fetchAddress(id) {
  return dispatch => {
    axios
      .get(`/api/address/${id}`)
      .then(res => res.data)
      .then(address => {
        dispatch(getAddress(address))
      })
      .catch(err => console.error("error fetching address", err));
  }
}

export function fetchUserAddress(id) {
  return dispatch => {
    axios
      .get(`/api/address/user/${id}`)
      .then(res => res.data)
      .then(address => {
        dispatch(getAddress(address));
      })
      .catch(err => console.error("error fetching address", err));
  }
}

export function changeAddress(id, address, ownProps) {
  return dispatch => {
    axios
      .put(`/api/address/user/${id}`, address)
      .then(res => res.data)
      .then(address => {
        dispatch(updateAddress(address))
        ownProps.history.push(`/home/${id}`)
      })
      .catch(err => console.error("error updating address", err));
  }
}

export function createAddress(address) {
  console.log("address", address);
  return dispatch => {
    axios
      .post(`/api/address`, address)
      .then(res => res.data)
      .then(address => {
        dispatch(addNewAddress(address))
      })
      .catch(err => console.error("error creating address", err));
  }
}


//reducer
export default function addressReducer(state = {}, action) {
  switch(action.type) {
    case GET_ADDRESS:
      return action.address;
    case UPDATE_ADDRESS:
      return action.address;
    case ADD_NEW_ADDRESS:
      return action.address;
    default:
      return state;
  }
}
