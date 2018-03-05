import axios from 'axios'

const GET_CART = 'GET_CART'

const getCart = cart => ({ type: GET_CART, cart })

export function fetchCart(userId) {
  return dispatch => {
    axios.get(`api/carts/${userId}`)
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