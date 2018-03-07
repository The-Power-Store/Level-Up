import axios from 'axios'


const GET_GUEST_CART = 'GET_GUEST_CART'

const getGuestCart = guestCart => ({ type: GET_GUEST_CART, guestCart })

export function fetchGuestCart() {
  return dispatch => {
    axios.get(`/session/cart/`)
      .then(res => res.data)
      .then(guestCart => {
        const action = getGuestCart(guestCart)
        dispatch(action)
      })
  }
}

export default function wholeGuestCartReducer(state = {}, action) {
  switch (action.type) {
    case GET_GUEST_CART:
      return action.guestCart
    default:
      return state
  }
}
