import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink, withRouter } from 'react-router-dom';
import { logout, addNewCategory } from '../store'

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { handleClick, isLoggedIn, categories } = this.props;

    console.log(`categories`, categories)
    return (
      <div>
        <nav>
          <div>
            <Link to="/products">All Products</Link>
            {
              categories.length ? categories.map(category => {
                return <Link to={`/products/categories/${category.id}`} key={category.id}>{category.title}</Link>
              }) : null
            }
          </div>
          <div>
            <Link to="/">
              <h1>MYSTIQUE BOUTIQUE</h1>
            </Link>
          </div>
          <div>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
          </a>
              </div>
            ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              )}
          </div>
        </nav>
        <hr />
      </div>

    )
  }
}

// const Navbar = ({ handleClick, isLoggedIn, categories }) => {
//   console.log(`categories, `, categories);

//   return (
//   )
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar));
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
