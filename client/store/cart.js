import axios from 'axios'

const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'

const getCart = cart => ({ type: GET_CART, cart })
export function transferItems(email) {
  return dispatch => {
    console.log("the transfer items thunk has been called")
    return axios.post('/api/carts/transfer', email)
      .then(res => res.data)
      .then(newCart => {
        console.log("we transfered all the items and deleted the session")
        const action = getCart(newCart)
        dispatch(action)
      })
  }
}

export function fetchCart() {
  return dispatch => {
    axios.get(`/api/carts/`)
      .then(res => res.data)
      .then(cart => {
        console.log("FETCHING THE CART")
        const action = getCart(cart)
        dispatch(action)
      })
  }
}
//potentially need to pass a session id here 


export default function wholeCartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}