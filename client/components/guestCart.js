import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import { fetchGuestCart } from '../store/cart'

class GuestCart extends Component {

  componentWillMount() {
   
    this.props.loadGuestCart(1) //change this later to be the actual session ID
    //console.log("Fetching the guest cart", this.state.guestCart)
  }
render(){
  return (
  <div>
    <h2>Here we are inside the guest cart component</h2>
    
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
    return {
      guestCart: state.guestCart,
      isLoggedIn: state.user.id,
    }
  }
  
  const mapDispatchToProps = function (dispatch, ownProps) {
    return {
      loadGuestCart: (sid) => {
        dispatch(fetchGuestCart(sid)) 
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GuestCart);