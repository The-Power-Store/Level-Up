import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { postCartItemThunk, postCartItemToSessionThunk } from '../../store/cartItem'
import PropTypes from 'prop-types'


const SingleProduct = (props) => {
  let product

  if (props.product.length) {
    product = props.product[0]
  }

  return product ? (
    <div className="single-product">
      <h2>{product.title}</h2>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {
        !!props.isLoggedIn ? <button type="submit" value={props.isLoggedIn} onClick={props.onClick}>Add to Cart </button>
          : <button type="submit" onClick={props.unAuthOnClick}>add to unauthorized user cart</button>
      }

    </div>
  ) : null
}

const mapStateToProps = function (state, ownProps) {

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
      const addToCart = { quantity: 1, userId: +event.target.value, productId: +ownProps.match.params.id }
      dispatch(postCartItemThunk(addToCart)) //change to a real variable once we have the log in stuff
    },
    unAuthOnClick: (event) => {
      const addToCart = { quantity: 1, productId: +ownProps.match.params.id }
      dispatch(postCartItemToSessionThunk(addToCart))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)