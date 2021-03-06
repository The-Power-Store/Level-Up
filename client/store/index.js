import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './auth'
import products from './product'
import categories from './category'
import reviews from './reviews'
import users from './users'
import cart from './cart'
import cartItem from './cartItem'
import orders from './order'
import address from './address'
import productsInOrder from './productsInOrder'
import sessionCart from './sessionCart'

const reducer = combineReducers({ user, products, categories, reviews, users, orders, address, cart, cartItem, productsInOrder, sessionCart })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './product'
export * from './category'
export * from './users'
export * from './reviews'
export * from './cart'
export * from './cartItem'
export * from './order'
export * from './address'
export * from './productsInOrder'
export * from './sessionCart'
