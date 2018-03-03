import React from 'react'
import {connect} from 'react-redux'
import { changeAddress, editUser, createAddress } from '../../store';

const EditProfile = props => {

  const { address, user, handleCreateSubmit, handleUpdateSubmit } = props;

  return (<div>
      {address ?
        <form onSubmit={handleUpdateSubmit}>
          <label>Update Your Address</label>
          <br />
          First Name:
          <input type="text" name="firstName" defaultValue={address.firstName} />
          Last Name:
          <input type="text" name="lastName" defaultValue={address.lastName} />
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
          <button type="submit">Submit Changes</button>
        </form>
        :
        <form onSubmit={handleCreateSubmit}>
          <label>Update Your Address</label>
          <br />
          First Name:
          <input type="text" name="firstName" defaultValue=''/>
          Last Name:
          <input type="text" name="lastName" defaultValue=''/>
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

  console.log('ownProps', ownProps)

  return {
    handleUpdateSubmit: (event) => {

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      const address = event.target.address.value;
      const city = event.target.city.value;
      const state = event.target.state.value;
      const zip = event.target.zip.value;
      const isShipping = event.target.isShipping.value;

      event.preventDefault()

      dispatch(changeAddress(ownProps.match.params.id, { firstName, lastName, address, city, state, zip }))
    },

    handleCreateSubmit: (event) => {

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const address = event.target.address.value;
        const city = event.target.city.value;
        const state = event.target.state.value;
        const zip = event.target.zip.value;
        const isShipping = event.target.isShipping.value;
        const userId = ownProps.match.params.id;

        event.preventDefault()

        dispatch(createAddress({ firstName, lastName, address, city, state, zip, userId }));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)


