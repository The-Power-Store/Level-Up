import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { postCartItemThunk, postCartItemToSession } from '../../store/cart';
import PropTypes from 'prop-types'


const SingleProduct = (props) => {
  let product;
  //console.log("is logged in??", props.isLoggedIn)
  //console.log("jfdksajfkldsjaklfjdksajkf" )
  if (props.product.length) {
    product = props.product[0];
  }
console.log("logged in from the singleproduct", props.isLoggedIn)

  return product ? (
    <div>
      <h2>{product.title}</h2>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {
        !!props.isLoggedIn?  <button type="submit"  value={props.isLoggedIn} onClick={props.onClick}>Add to Cart </button>
        :<button type="submit" onClick={props.unAuthOnClick}>add to unauthorized user cart</button>
      }
   
    </div>
  ) : null
}

//<button type="submit" onClick={props.onClick}>Add to Cart</button>
//<input type="button" value="mybutton1" onclick="dosomething(this)">

const mapStateToProps = function (state, ownProps) {
  // console.log("skjflksajd", state.user)
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
    unAuthOnClick:(event)=>{
      const addToCart = {quantity:1, productId: +ownProps.match.params.id }
      dispatch(postCartItemToSession(addToCart))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
