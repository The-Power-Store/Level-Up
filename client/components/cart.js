import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';

const Cart = props =>{

return(
    <h1>cart page!</h1>
)
}


const mapStateToProps = function (state, ownProps) {
    //if logged in, get the user id from there, if not, get it from the session. 
    return {
      products: state.products.filter(product =>
        product.id === 1
      )
    }
  }
  
  const mapDispatchToProps = function (dispatch, ownProps) {
    // return {
    //   onClick: (event) => {
    //     console.log('oh hEEEeeelllooooo', event, ' ', ownProps)
    //     const addToCart = { quantity: 1, userId: 1, productId: +ownProps.match.params.id }
    //     console.log('dis be the thing added to the cart', addToCart)
    //     dispatch(postCartItemThunk(addToCart)) //change to a real variable once we have the log in stuff
    //   }
    // }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);