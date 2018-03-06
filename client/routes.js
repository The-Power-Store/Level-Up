import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch
} from "react-router-dom";
import PropTypes from "prop-types";
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
  PreviousOrderPage,
  EditProduct,
  OrderConfirm
} from "./components";

import store, {
  me,
  fetchAllProducts,
  fetchCategories,
  fetchReviews
} from "./store";
// import { OrderForm } from './components/order-form'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return <div>
        <Navbar />
        <div className="main">
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/guestCart" component={guestCart} />
            <Route exact path="/newOrder" component={OrderForm} />
            <Route path="/newOrder/confirm" component={OrderConfirm} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/categories/:id" component={ProductCategory} />
            <Route path="/products/:id" component={SingleProduct} />
            {isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/cart" component={Cart} />
                <Route path="/home" component={UserHome} />
                <Route path="/user/editProfile/:id" component={EditProfile} />
                <Route path="/orders/:id" component={PreviousOrderPage} />
                {isAdmin && <Route path="/admin/product/:id" component={EditProduct} />}
              </Switch>
            }
          </Switch>
        </div>
      </div>
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    products: state.products,
    isAdmin: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchAllProducts());
      dispatch(fetchCategories());
      dispatch(fetchReviews());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
