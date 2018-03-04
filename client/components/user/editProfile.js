import React from 'react'
import {connect} from 'react-redux'
import { changeAddress, editUser, createAddress, updateUser } from '../../store';

const EditProfile = props => {

  const { address, user, handleCreateSubmit, handleUpdateSubmit, handleNameSubmit } = props;

  console.log('user', user)

  return (<div className="profile-page">
      <div>
        <form onSubmit={handleNameSubmit}>
          <h3 id="title">Update Your Name:</h3>
          <br />
          First Name:
          <input type="text" name="firstName" defaultValue={user.firstName} />
          Last Name:
          <input type="text" name="lastName" defaultValue={user.lastName} />
          <button type="submit">Submit Name Changes</button>
        </form>
      </div>
      {address ?
        <form onSubmit={handleUpdateSubmit}>
          <h3 id="title">Update Your Address:</h3>
          <br />
          Address:
          <input type="text" name="address" defaultValue={address.address} />
          City:
          <input type="text" name="city" defaultValue={address.city} />
          State:
          <input type="text" name="state" defaultValue={address.state} />
          Zip:
          <input type="text" name="zip" defaultValue={address.zip} />
          isShipping:
          <select>
            <option name="isShipping">TRUE</option>
            <option name="isShipping">FALSE</option>
          </select>
          <button type="submit">Submit Address Changes</button>
        </form>
        :
        <form onSubmit={handleCreateSubmit}>
          <h3 id="title">Update Your Address:</h3>
          <br />
          Address:
          <input type="text" name="address" defaultValue='' />
          City:
          <input type="text" name="city" defaultValue='' />
          State:
          <input type="text" name="state" defaultValue='' />
          Zip:
          <input type="text" name="zip" defaultValue='' />
          isShipping:
          <select>
            <option name="isShipping">TRUE</option>
            <option name="isShipping">FALSE</option>
          </select>
          <button type="submit">Submit Changes</button>
        </form>}
    </div>)

}


const mapStateToProps = state => {
  return {
    address: state.address,
    user: state.user
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {

  const {id} = ownProps.match.params;

  console.log('ownProps', ownProps)

  return {
    handleUpdateSubmit: (event) => {

      const address = event.target.address.value;
      const city = event.target.city.value;
      const state = event.target.state.value;
      const zip = event.target.zip.value;
      const isShipping = event.target.isShipping.value;

      event.preventDefault()

      dispatch(changeAddress(id, { address, city, state, zip }))
    },

    handleCreateSubmit: (event) => {

      const address = event.target.address.value;
      const city = event.target.city.value;
      const state = event.target.state.value;
      const zip = event.target.zip.value;
      const isShipping = event.target.isShipping.value;
      const userId = ownProps.match.params.id;

      event.preventDefault()

      dispatch(createAddress({ address, city, state, zip, userId}));
    },

    handleNameSubmit: (event) => {

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;

      event.preventDefault()

      dispatch(editUser(id, {firstName, lastName}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)


