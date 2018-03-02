import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//why do we need user and users??? questions!
import user from './user'
import products from './product'
import categories from './category'
import carts from './cart'
import reviews from './reviews'
import users from './users'

const reducer = combineReducers({ user, products, categories, reviews, users })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './category'
