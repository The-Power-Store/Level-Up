import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../store'
import { addOrderThunk } from '../store/order'


const OrderForm = (props) => {
  const { user, handleSubmit, error } = props
  let userId;
  props.user.id ? userId = props.user.id : userId = null;
  console.log('USER STUFF !!!!!!', props.user)
  console.log('HIIIIAIIAIIAIIAIIAIIAI', Object.keys(props.user).length)
  const firstName = ""
  const lastName = ""
  const email = ""
  if (Object.keys(props.user).length > 0) {
    console.log('WHADDUP')
    const firstName = props.user.firstName
    const lastName = props.user.lastName
    const email = props.user.email
  }
  return (
    <div className="order-form">
      <h1> Your current order: </h1>
      <form onSubmit={(event) => handleSubmit(event, userId)} >
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
          <button className="btn btn-primary" type="submit">Place your Order!</button>
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
  return {
    handleSubmit(event, id) {
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
      ownProps.history.push('/newOrder/confirm')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)