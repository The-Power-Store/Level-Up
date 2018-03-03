import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { postCartItemThunk } from '../../store/cart';
import PropTypes from 'prop-types'
import { Session } from 'inspector';

const SingleProduct = (props) => {
  let product;
  console.log("is logged in??", props.isLoggedIn)
  console.log("jfdksajfkldsjaklfjdksajkf", Session)
  if (props.product.length) {
    product = props.product[0];
  }

  return product ? (
    <div>
      <h2>{product.title}</h2>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button type="submit" onClick={props.onClick}>Add to Cart</button>
    </div>
  ) : null
}

const mapStateToProps = function (state, ownProps) {
  console.log("skjflksajd", state.user)
  return {
    product: state.products.filter(product =>
      product.id === +ownProps.match.params.id
    ),
    isLoggedIn: state.user.id,
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onClick: (event) => {
      //check if logged in 
      console.log('oh is loggedin', ownProps.isLoggedin, ' ', ownProps)
      const addToCart = { quantity: 1, userId: 1, productId: +ownProps.match.params.id }
      console.log('dis be the thing added to the cart', addToCart)
      dispatch(postCartItemThunk(addToCart)) //change to a real variable once we have the log in stuff
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
