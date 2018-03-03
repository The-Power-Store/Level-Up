/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { Login, Signup } from './auth-form'
export { default as AllProducts } from './products/allProducts'
export { default as SingleProduct } from './products/singleProduct'
export { default as ProductCategory } from './products/productCategory'
export { default as Homepage } from './homepage'
export { default as OrderHistory } from './user/orderHistory'
export { default as EditProfile } from './user/editProfile'
