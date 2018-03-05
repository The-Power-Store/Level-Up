import axios from 'axios'

//action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
// const GET_CATEGORY_PRODUCTS = 'GET_CATEGORY_PRODUCTS'

//action creators
const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products })
const addNewProduct = product => ({ type: ADD_NEW_PRODUCT, product })
const updateProduct = product => ({ type: UPDATE_PRODUCT, product })

//thunk creators
export function fetchAllProducts() {
  return function (dispatch) {
    axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = getAllProducts(products)
        dispatch(action)
      })
      .catch(err => console.error("error fetching products", err))
  }
}

export function createProduct(product) {
  return function (dispatch) {
    axios.post('/api/products', product)
      .then(res => res.data)
      .then(product => {
        const action = addNewProduct(product)
        dispatch(action)
      })
      .catch(err => console.error('error creating product', err))
  }
}

export function update(id, product) {
  return function (dispatch) {
    axios.put(`/api/products/${id}`, product)
      .then(res => res.data)
      .then(product => {
        const action = updateProduct(product)
        dispatch(action)
      })
      .catch(err => console.error('error updating product', err))
  }
}

//reducer
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case ADD_NEW_PRODUCT:
      return [...state, action.product]
    case UPDATE_PRODUCT:
      return state.map(product => (
        action.product.id === product.id ? action.product : product
      ))
    default:
      return state
  }
}