import axios from 'axios'

//action types
const GET_PRODUCTS_IN_ORDER = 'GET_PRODUCTS_IN_ORDER'

//action creators
const getProductsInOrder = products => ({ type: GET_PRODUCTS_IN_ORDER, products })

//thunk creators
export function findProductsInOrder(id) {
  return dispatch => {
    axios
      .get(`/api/products/order/${id}`)
      .then(res => res.data)
      .then(products => {
        dispatch(getProductsInOrder(products))
      })
      .catch(err => console.error("error fetching products", err))
  }
}

//reducer
export default function productsInOrderReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS_IN_ORDER:
      return action.products
    default:
      return state
  }
}