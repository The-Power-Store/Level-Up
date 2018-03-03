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
<<<<<<< HEAD
import address from './address'

const reducer = combineReducers({ user, products, categories, reviews, users, address })
=======
import orders from './order'

const reducer = combineReducers({ user, products, categories, reviews, users, orders })
>>>>>>> master
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './category'
export * from './users'
export * from './reviews'
<<<<<<< HEAD
export * from './address'

=======
export * from './order'
>>>>>>> master
