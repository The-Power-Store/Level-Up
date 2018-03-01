import React from 'react'
import {connect} from 'react-redux'
import store from '../../store'

const singleProduct = (props) => {
  const product = props.products.filter(product =>
   product.id === props.match.params.id
  )

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

export const SingleProduct = connect(mapStateToProps)(SingleProduct);
