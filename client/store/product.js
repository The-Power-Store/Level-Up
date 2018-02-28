import axios from 'axios';

//action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'

//action creators
export function getAllProducts(products) {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

export function addNewProduct(product) {
  return {
    type: ADD_NEW_PRODUCT,
    product
  }
}

//thunks

export function fetchAllProducts() {
  return function(dispatch) {
    return axios
      .get("/api/products")
      .then(res => res.data)
      .then(products => {
        const action = getAllProducts(products);
        dispatch(action);
      })
      .catch(err => console.error("error fetching products", err));
  }
}

export function createProduct(product) {
  return function(dispatch) {
    return axios.post('/api/products', product)
    .then(res => res.data)
    .then(product => {
      const action = addNewProduct(product)
      dispatch(action);
    })
    .catch(err => console.error('error creating product', err));
  }
}

export function updateProduct(id, product) {
  return function(dispatch) {
    return axios.put(`api/products/${id}`, product)
    .then(res => res.data)
    .then(product => {
      dispatch(fetchAllProducts);                           //need to check this! if you've updated, want to run fetch all products again to update the state?
    })
    .catch(err => console.error('error updating product', err));
  }
}


//reducer
export default function productsReducer (state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    case ADD_NEW_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
