// Organize by library/source --KHEA
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'
import { postCartItemThunk, postCartItemToSessionThunk } from '../../store/cartItem'


const SingleProduct = (props) => {
  // if !product, return some div that says "sorry, we're having trouble..." --KHEA
  let product

  if (props.product.length) {
    product = props.product[0]
  }

  console.log('reviews', props.reviews)

  return product ? (
    <div className="single-product">
      <h2>{product.title}</h2>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {
        !!props.isLoggedIn
          ? <button type="submit"
                    value={props.isLoggedIn}
                    onClick={props.onClick}>
              Add to Cart
            </button>
          : <button type="submit" onClick={props.unAuthOnClick}>add to unauthorized user cart</button>
      }
      <h4>Reviews</h4>
      {
        props.reviews.length > 0 ? // should work without length as well --KHEA
          props.reviews.map(review => (
            <div key={review.id}>
              <h5>--{review.stars} Stars</h5>
              <p>--{review.content}</p>
            </div>
          ))
          : null
      }

    </div>
  ) : null // think about && --KHEA
}

const mapStateToProps = function (state, ownProps) {

  return {
    // think about using .find here instead of .filter --KHEA
    // then refactor above
    product: state.products.filter(product =>
      product.id === +ownProps.match.params.id
    ),
    isLoggedIn: state.user.id,
    reviews: state.reviews.filter(review =>
      review.productId === +ownProps.match.params.id
    )
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {

  return {
    // consider incorporating isLoggedIn logic here --KHEA
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
