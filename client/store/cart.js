import axios from 'axios';

const GET_CART = 'GET_CART'
const GET_GUEST_CART ='GET_GUEST_CART'

const getCart = cart => ({ type: GET_CART, cart })
const getGuestCart = cart => ({ type: GET_GUEST_CART, cart })


export function fetchCart(userId){
    return dispatch=>{
        console.log("shouting out from the thunk fetching the users cart data, user ID:",userId)
        axios.get(`api/carts/${userId}`)
        .then(res => res.data)
        .then(cart =>{
            const action = getCart(cart)
            dispatch(action)
        })
    }
}
//potentially need to pass a session id here 
export function fetchGuestCart(){
    return dispatch=>{
        console.log("shouting out from the thunk fetching the GUEST cart data, user ID:")
        axios.get(`/session/cart/`)
        .then(res => res.data)
        .then(cart =>{
            console.log("the retjfdksjfldksurned item", cart)
            const action = getGuestCart(cart)
            dispatch(action)
        })
    }
}


export default function wholeCartReducer(state = [], action) {
    switch (action.type) {
        case GET_CART:
            return action.cart
        case GET_GUEST_CART:
            return action.cart
        default:
            return state
    }
}