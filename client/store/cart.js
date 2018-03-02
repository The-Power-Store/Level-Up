import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_CART_ITEM = 'GET_CART_ITEM'
const POST_CART_ITEM = 'POST_CART_ITEM'

/**
 * INITIAL STATE 
 */
const defaultState = {
    defaultCart: [],
    defaultCartItem: {}
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const getCartItem = cartItem => ({ type: GET_CART_ITEM, cartItem })
const postCartItem = cartItem => ({ type: POST_CART_ITEM, cartItem })
/**
* THUNK CREATORS
*/

// export const getCart = (cart) => {
//     dispatch => {
//         axios.get('/api/carts/:userId')
//             .then(res => res.data)
//             .
//     }
// }
export const postCartItem = (cartItem) => {
    dispatch => {
        axios.post('/api/carts/', cartItem)
            .then(res => res.data)
            .then(cartItem => {
                const action = postCart(cartItem)
                dispatch(action)
            })
            .catch(err => console.error('error creating cart item', err))
    }
}

/**
* REDUCER
*/
export default function cartReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_CART_ITEM:
            return action.cartItem
        case POST_CART_ITEM:
            return [...state, action.cartItem]
        default:
            return state

    }
}