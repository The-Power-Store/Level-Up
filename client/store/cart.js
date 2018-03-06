import axios from 'axios'

const GET_CART = 'GET_CART'
const GET_GUEST_CART ='GET_GUEST_CART'
// const ADD_TO_CART = 'ADD_TO_CART'

const getCart = cart => ({ type: GET_CART, cart })
// const addToCart = cartitem =>({type: ADD_TO_CART, cartitem})

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