import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'

import { fetchGuestCart } from '../store/sessionCart'

class GuestCart extends Component {

  componentDidMount() {
   
    this.props.loadGuestCart() //change this later to be the actual session ID
  }
  render(){
    const { guestCart } = this.props 
    const { products } = this.props
    console.log("props on the guest cart now equal", guestCart)

    const productIdNums = Object.entries(guestCart).map((item) => {
      return +item[0]
    })
    console.log("the product id numbers in this cart are", productIdNums)

    const productsInCart = products.filter(product => {
      
      if (productIdNums.indexOf(product.id) >= 0) {

        return product
      }
    })

      console.log("The product left on the state of the cart is ", productsInCart)

    return (
      <div>
        <h1>hello from the cart </h1>
        <h2>cart items:</h2>
        {
          productsInCart.map((item) => {
            return (
              <div key={item.id}>
                <h1>{item.title}</h1>
                <h1>{guestCart[item.id]}</h1>
              </div>)
          })
        }
        <Link to={'/newOrder'}> <button>Proceed to checkout, lovely</button></Link>
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
    console.log("jfdklsjafld",state)
    return {
      guestCart: state.sessionCart,
      products: state.products,
      isLoggedIn: state.user.id,
    }
  }
  
  const mapDispatchToProps = function (dispatch, ownProps) {
    return {
      loadGuestCart: () => {
        dispatch(fetchGuestCart()) 
      }
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)