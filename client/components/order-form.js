import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addOrder } from '../store'


const OrderForm = (props) => {
  console.log('i actually made it to this route')
  const { handleSubmit } = props
  return (
    <div>
      <h1> HELLO WORLD I'M HERE AND WORKING </h1>
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
          <label htmlFor="address_city"><small>Zip Code</small></label>
          <input name="address_city" type="number" />
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
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);