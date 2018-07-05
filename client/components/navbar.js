import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../store";
import { NavLink, withRouter } from "react-router-dom";
import { logout, addNewCategory } from "../store";
import { fetchCart } from "../store/cart";
import { fetchGuestCart } from "../store/sessionCart";
class Navbar extends Component {
  render() {
    let { handleClick, isLoggedIn, categories, user } = this.props;

    return (
      <div>
        <nav>
          <div className="left-navbar">
            <Link to="/products">All Products</Link>
            {categories.length
              ? categories.map(category => {
                  return (
                    <Link
                      to={`/products/categories/${category.id}`}
                      key={category.id}
                    >
                      {category.title}
                    </Link>
                  );
                })
              : null}
          </div>
          <div className="logo-navbar">
            <Link to="/">
              <h1 className="logo-title">Mystique Boutique</h1>
            </Link>
          </div>
          <div className="right-navbar">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to={`/home/${user.id}`}>Home</Link>
                <Link to="/cart">CART!!</Link>
                <span className="badge">
                  {this.props.userCart
                    .map(lineitem => lineitem.quantity)
                    .reduce((a, b) => {
                      return a + b;
                    }, 0)}
                </span>

                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/guestCart">CART!</Link>
                <span className="badge">
                  {Object.keys(this.props.guestCart)
                    .map(key => {
                      return this.props.guestCart[key];
                    })
                    .reduce((a, b) => {
                      return a + b;
                    }, 0)}
                </span>
              </div>
            )}
          </div>
        </nav>
        <hr />
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    categories: state.categories,
    user: state.user,
    userCart: state.cart,
    guestCart: state.Cart
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(fetchCart());
      dispatch(fetchGuestCart());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
