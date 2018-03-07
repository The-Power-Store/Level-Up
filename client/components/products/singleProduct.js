import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { fetchCart, fetchGuestCart} from '../../store'
import { postCartItemThunk, postCartItemToSessionThunk} from '../../store/cartItem'
import PropTypes from 'prop-types'


const SingleProduct = (props) => {
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
        !!props.isLoggedIn ? <button type="submit" value={props.isLoggedIn} onClick={props.onClick}>Add to Cart </button>
          : <button type="submit" className="btn btn-primary" onClick={props.unAuthOnClick}>Add to cart!</button>
      }
      {
        props.reviews.length ?
        <div>
          <br />
          <h4>Reviews:</h4>
        </div>

        :<div>
          <br />
          <h4>This magical product is yet to be reviewed!</h4>
        </div>
      }
      {
        props.reviews.length > 0 ?
          props.reviews.map(review => (
            <div key={review.id}>
              <h5>--{review.stars} Stars</h5>
              <p>--{review.content}</p>
            </div>
          ))
          : null
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
    reviews: state.reviews.filter(review =>
      review.productId === +ownProps.match.params.id
    )
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {

  return {
    onClick: (event) => {
      const addToCart = { quantity: 1, userId: +event.target.value, productId: +ownProps.match.params.id }
      console.log("adding this item to the cart", addToCart)
      dispatch(postCartItemThunk(addToCart))
      ownProps.history.push('/cart')
      console.log("should be calling fetch cart!")

    },
    unAuthOnClick: (event) => {
      const addToCart = { quantity: 1, productId: +ownProps.match.params.id }
      dispatch(postCartItemToSessionThunk(addToCart))
      ownProps.history.push('/guestCart')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
