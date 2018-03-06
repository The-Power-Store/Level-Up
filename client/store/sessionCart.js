import axios from 'axios'


const GET_GUEST_CART ='GET_GUEST_CART'


const getGuestCart = guestCart => ({ type: GET_GUEST_CART, guestCart })


//potentially need to pass a session id here 
// export function transferItems(){
//     return dispatch=>{

//         axios.post('/api/carts/transfer')
//         .then(res=> res.data)
//         .then(newCart=>{
//             console.log("we transfered all the items and deleted the session")
//             const action = 
//         })
//     }
// }

export function fetchGuestCart(){
    return dispatch=>{
        console.log("shouting out from the thunk fetching the GUEST cart data, user ID:")
        axios.get(`/session/cart/`)
        .then(res => res.data)
        .then(guestCart =>{
            console.log("the item returned from the getch guest thunk", guestCart)
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