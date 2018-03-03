import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editUser} from '../store'
import OrderHistory from './index'
import PersonalInfo from './index'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { user } = props;

  return <div>
      {user.firstName ?
        <div>
        <h3>Welcome back {user.firstName}!</h3>
        <h5>Order History</h5>
        <OrderHistory />
        <h5>Personal Info</h5>
        <PersonalInfo />
      </div>
      : <div>
          <h3>Welcome, {user.email}</h3>
          <h5>Please take a minute to complete your profile!</h5>

          <form onSubmit={(event) => props.handleSubmit(event, props.user.id)}>
            First Name:
            <input type="text" name="firstName" />
            Last Name:
            <input type="text" name="lastName" />
            <button type="submit">Update Profile</button>
          </form>
        </div>}
    </div>;
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    handleSubmit(event, id) {

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;

      event.preventDefault();

      dispatch(editUser(id, { firstName, lastName }))
      window.location.reload();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   user: PropTypes.object
// };
