import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import { fetchCart } from '../store/cart'

class Cart extends Component {

  componentDidMount() {
    this.props.loadCart()

  }

  render() {
    const { cart, products, user } = this.props

    const productIdNums = cart.map(item => {
      return item.productId
    })

    const productsInCart = products.filter(product => {
      if (productIdNums.indexOf(product.id) >= 0) return product
    })

    const total = (price, quantity) => {
      return '$' + (+price * +quantity)
    }

    return (
      <div className="cart-container">
        <h1>hello from the cart! </h1>
        <br />
        <div className="cart">
          <h2 id="cart-title">Cart Items:</h2>
          {
            productsInCart.map((item) => {
              const quantity = cart.filter((cartItem) => {
                if (cartItem.productId == item.id) {
                  return cartItem.quantity
                }
              })
              return (
                <div key={item.id}>
                  <h1>{item.title}</h1>
                  <h1>Quantity: {quantity[0].quantity}</h1>
                  <h3>Total Price: {total(item.price, quantity[0].quantity)}</h3>
                  <p>----------------------------------------------</p>
                </div>)
            })
          }
        </div>
        <Link to="/newOrder"> <button className="btn btn-success">Proceed to checkout, lovely</button></Link>
        <Link to={"/products"}>
          <button className="btn btn-primary">Continue Shopping!</button>
        </Link>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  //if logged in, get the user id from there, if not, get it from the session.
  return {
    cart: state.cart,
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCart: () => {
      dispatch(fetchCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
