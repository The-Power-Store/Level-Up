import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const POST_CART = 'POST_CART'

/**
 * INITIAL STATE 
 */

const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART })
const postCart = cart => ({ type: POST_CART })
/**
* THUNK CREATORS
*/
export const postCartItem = (cart) => {
    dispatch => {
        axios.post('/api/carts/', cart)
            .then(res => res.data)
            .then(cart => {
                const action = postCart(cart)
                dispatch(action)
            })
            .catch(err => console.error('error creating cart item', err))
    }
}

/**
* REDUCER
*/
export default function cartReducer(state = defaultCart, action) {
    switch (action.type) {
        case POST_CART:
            return
        // finish this 03.02 
    }
}