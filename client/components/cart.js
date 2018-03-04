import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { fetchCart } from '../store/cart'

class Cart extends Component{

    componentWillMount(){
      this.props.loadCart(1)
      console.log("items", this.props)
    }
    
    render(){
      const { defaultCart } = this.props
      console.log("props now equal",defaultCart)
      //    const { isLoggedIn } = this.props;

  return (
    <div>
      <h1>hello from the cart </h1>
      <h2>cart items: {this.props && this.props.cartItems}</h2>
      
      </div>
    )
  }
}
  
  // {
  //   !!props.isLoggedIn?  <button type="submit"  value={props.isLoggedIn} onClick={props.onClick}>Add to Cart </button>
  //   :<button type="submit" onClick={props.unAuthOnClick}>add to unauthorized user cart</button>
  // }

const mapStateToProps = function (state, ownProps) {
    //if logged in, get the user id from there, if not, get it from the session. 
    console.log("The props stat cart is ", state.cart.defaultCart)
    return {
      cartItems: state.cart,
      isLoggedIn: state.user.id,
    }
  }
  
  const mapDispatchToProps = function (dispatch, ownProps) {
    return {
      loadCart: (userID) => {
        dispatch(fetchCart(userID)) 
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);