import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_CART_ITEM = 'GET_CART_ITEM'
const POST_CART_ITEM = 'POST_CART_ITEM'
const POST_SESSION_CART_ITEM = 'POST_SESSION_CART_ITEM'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */

const getCartItem = cartItem => ({ type: GET_CART_ITEM, cartItem })
const postCartItem = cartItem => ({ type: POST_CART_ITEM, cartItem })
const postCartItemToSession = cartItem =>({type:POST_SESSION_CART_ITEM, cartItem})
/**
* THUNK CREATORS
*/

// export const getCartThunk = (cart) => {
//     dispatch => {
//         axios.get('/api/carts/:userId')
//             .then(res => res.data)
//             .
//     }
// }
// export const getCartItemThunk = (cart) => {
//     dispatch => {
//         axios.get('/api/carts/:userId')
//             .then(res => res.data)
//             .
//     }
// }

export function postCartItemToSessionThunk(cartItem){
    return dispatch =>{
        console.log("shouting out from the postsessionthunk, the cart being posted i", cartItem)
        axios.post('/session', cartItem)
            .then(res => res.data)
            .then(cartItem=>{
                const action = postCartItemToSession(cartItem)
                dispatch(action)
            })
            .catch(err => console.error('error creating cart item', err))
    }
}
export function postCartItemThunk(cartItem) {
    return dispatch => {
        // console.log("from the post thunk,", cartItem)
        //need to add a check to see if that userIS is already associated with that product id, in which case issue a put
        axios.post('/api/carts/', cartItem)
            .then(res => res.data)
            .then(cartItem => {
                const action = postCartItem(cartItem)
                dispatch(action)
            })
            .catch(err => console.error('error creating cart item', err))
    }
}

/**
* REDUCER
*/
export default function cartReducer(state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEM:
            return action.cartItem
        case POST_CART_ITEM:
            return [...state, action.cartItem]
        case POST_SESSION_CART_ITEM:
            return action.cartItem
        default:
            return state

    }
}
