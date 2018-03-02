import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { postCartItem } from '../../store/cart';

const SingleProduct = (props) => {
  let product;

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
  return {
    product: state.products.filter(product =>
      product.id === +ownProps.match.params.id
    )
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onClick: (event) => {
      console.log(ownProps)
      const addToCart = { quantity: 1, userId: 1, productId: +ownProps.match.params.id }
      dispatch(postCartItem(addToCart)) //change to a real variable once we have the log in stuff
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);