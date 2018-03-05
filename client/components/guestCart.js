import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

const GuestCart = props => {

  return (
    <div>
      <h2>Here we are inside the guest cart component</h2>

    </div>
  )
}

// {
//   !!props.isLoggedIn?  <button type="submit"  value={props.isLoggedIn} onClick={props.onClick}>Add to Cart </button>
//   :<button type="submit" onClick={props.unAuthOnClick}>add to unauthorized user cart</button>
// }
const mapStateToProps = function (state, ownProps) {
  //if logged in, get the user id from there, if not, get it from the session. 
  return {
    cartItems: state.cart.filter(item =>
      product.id === 1
    ),
    isLoggedIn: state.user.id,
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {

  return {
    loadCart: (event) => {
      dispatch(fetchGuestCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)