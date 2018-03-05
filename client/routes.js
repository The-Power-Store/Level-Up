import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Homepage,
  ProductCategory,
  SingleProduct,
  AllProducts,
  Navbar,
  Cart,
  guestCart,
  EditProfile,
  OrderForm,
  PreviousOrderPage
} from './components'
import store, { me, fetchAllProducts, fetchCategories, fetchReviews } from './store'
// import { OrderForm } from './components/order-form'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        <Navbar />
        <div className="main">
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/guestCart" component={guestCart} />
            <Route path="/newOrder/:id" component={OrderForm} />
            {/* get rid of the id here, mutate how you're doing this in OrderForm --KHEA*/}
            {
              isLoggedIn &&
              <Switch> // don't need two Switch statements --KHEA
                {/* Routes placed here are only available after logging in */}
                <Route path="/cart" component={Cart} />
                <Route path="/home" component={UserHome} />
                <Route exact path="/products" component={AllProducts} />
                <Route path="/products/categories/:id" component={ProductCategory} />
                <Route path="/products/:id" component={SingleProduct} />
                <Route path="/user/editProfile/:id" component={EditProfile} />
                <Route path="/orders/:id" component={PreviousOrderPage} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            {/* Move these three up and delete isLoggedIn three to test. --KHEA */}
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/categories/:id" component={ProductCategory} />
            <Route path="/products/:id" component={SingleProduct} />
          </Switch>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchAllProducts())
      dispatch(fetchCategories())
      dispatch(fetchReviews())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
