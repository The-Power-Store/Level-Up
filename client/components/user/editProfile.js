import React from 'react'
import {connect} from 'react-redux'
import { changeAddress, editUser } from '../../store';

const EditProfile = props => {

  const { address, user } = props;

  return (
      <div>
        <form onSubmit={props.handleSubmit}>
        <label>Update Your Address</label><br></br>
        First Name:
        <input
          type="text"
          name="firstName"
          defaultValue={props.user.firstName}/>
        Last Name:
        <input
          type="text"
          name="lastName"
          defaultValue={props.user.lastName}/>
        Address:
        <input
          type="text"
          name="address"
          defaultValue={props.address.address}/>
        City:
        <input
          type="text"
          name="city"
          defaultValue={props.address.city}/>
        State:
        <input
          type="text"
          name="state"
          defaultValue={props.address.state}/>
        Zip:
        <input
          type="text"
          name="zip"
          defaultValue={props.address.zip}/>
        isShipping:
        <select>
          <option name="isShipping">TRUE</option>
          <option name="isShipping">FALSE</option>
        </select>
        <button type="submit">Submit Changes</button>
      </form>
      </div>

    )

}


const mapStateToProps = state => {
  return {
    address: state.address,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {

  console.log('ownProps', ownProps)
  return {
    handleSubmit: (event) => {

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      const address = event.target.address.value;
      const city = event.target.city.value;
      const state = event.target.state.value;
      const zip = event.target.zip.value;
      const isShipping = event.target.isShipping.value;

      event.preventDefault()

      dispatch(changeAddress(ownProps.match.params.id, {firstName, lastName, address, city, state, zip}))
      // dispatch(editUser(userId, {firstName, lastName}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)


