import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { addOrderThunk } from '../store/order'


const OrderForm = (props) => {
  const { user, handleSubmit, error } = props

  return (
    <div>
      <h1> Your current order: </h1>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="firstName"><small>First Name</small></label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName"><small>Last Name</small></label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="address"><small>Street Address</small></label>
          <input name="address" type="text" />
        </div>
        <div>
          <label htmlFor="address_city"><small>City</small></label>
          <input name="address_city" type="text" />
        </div>
        <div>
          <label htmlFor="address_state"><small>State</small></label>
          <input name="address_state" type="text" />
        </div>
        <div>
          <label htmlFor="address_zip"><small>Zip Code</small></label>
          <input name="address_zip" type="number" />
        </div>
        <div>
          <button type="submit">Place your Order!</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    user: state.user,
    // displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('dis be the own props', ownProps)
  // console.log('this is the event target', event.target)
  const { id } = ownProps.match.params;
  return {
    handleSubmit(event) {
      event.preventDefault()
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      const email = event.target.email.value
      const address = event.target.address.value
      const city = event.target.address_city.value
      const state = event.target.address_state.value
      const zip = event.target.address_zip.value
      const userId = id
      dispatch(addOrderThunk({ firstName, lastName, email, address, city, state, zip, userId }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)