import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { fetchCart } from '../store/cart'

class Cart extends Component{

    componentWillMount(){
      this.props.loadCart(this.props.user.id)
      
    }
    
    render(){
      const { cart } = this.props
      const { products } = this.props
      console.log("props now equal",cart)
      const productIdNums = cart.map((item)=>
        item.productId
        
      )
      console.log("the user is ", this.props.user)
      console.log("the products on the state are ", products)
      const productsInCart = products.filter(product=>{
        console.log("LOOK here, shold be numbers",product.id)
        if(productIdNums.indexOf(product.id)>=0){
          
          return product
        }

      })
      console.log("The product left on the state of the cart is ", productsInCart)

      return (
        <div>
          <h1>hello from the cart </h1>
          <h2>cart items:</h2> 
          { 
            productsInCart.map((item)=>{
              const quantity = cart.filter((cartItem)=>{
                if(cartItem.productId == item.id ){
                  return cartItem.quantity
                }
              })
              console.log("CAAAART", quantity[0].quantity) //change this one the store is fixed from having repeats 
              return (
                <div key={item.id}>
                <h1>{item.title}</h1>
                <h1>{quantity[0].quantity}</h1> 
                </div>)
          })
          }
          
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
    console.log("The props stat cart is ", state.cart)
    return {
      cart: state.cart,
      products: state.products,
      user: state.user
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