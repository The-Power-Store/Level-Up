import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'

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

export default connect(mapStateToProps)(SingleProduct);
