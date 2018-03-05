import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ORDER = 'ADD_ORDER'
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultState = {
  orders: [],
  order: {}
}

/**
* ACTION CREATORS
*/
const addOrder = order => ({ type: ADD_ORDER, order })
const getOrders = orders => ({ type: GET_ORDERS, orders })

/**
* THUNK CREATORS
*/
export function getOrdersThunk() {
  return dispatch => {
    axios.get(`/api/orders`)
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders)
        dispatch(action)
      })
      .catch(err => console.error('error finding orders', err))
  }
}

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
export default function ordersReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}