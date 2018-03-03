import axios from 'axios'


/**
 * ACTION TYPES
 */

const ADD_ORDER = 'ADD_ORDER'

/**
 * INITIAL STATE 
 */
const defaultState = {
    defaultOrders =[],
    defaultOrder = {}
}
/**
* ACTION CREATORS
*/
const addOrder = order => ({ type: ADD_ORDER, order })

/**
* THUNK CREATORS
*/

export function addOrderThunk(order) {
    return dispatch => {
        axios.post('/api/orders/', order)
            .then(res => res.data)
            .then(order => {
                const action = addOrder(order)
                dispatch(action)
            })
            .catch(err => console.error('error adding new order', err))
    }
}

/**
* REDUCER
*/

export default function cartReducer(state = defaultState, action) {
    switch (action.type) {
        // case GET_ORDERS:
        //     return action.orders
        case ADD_ORDER:
            return [...state, action.order]
        default:
            return state

    }
}