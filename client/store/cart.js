import axios from 'axios'

const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'

const getCart = cart => ({ type: GET_CART, cart })
export function transferItems(email) {
  return dispatch => {
    return axios.post('/api/carts/transfer', email)
      .then(res => res.data)
      .then(newCart => {
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
        const action = getCart(cart)
        dispatch(action)
      })
  }
}

export default function wholeCartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}