import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser } from '../store';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { user } = props;

  console.log('user', user)
  return <div>
      {user.firstName ? <h3>Welcome back {user.firstName}!</h3> :
        <div>
          <h3>Welcome, {user.email}</h3>
          <h5>Please take a minute to complete your profile!</h5>

          <form onSubmit={event => this.handleSubmit(event, props)}>
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

const mapDispatchToProps = (dispatch, ownProps) => {
   console.log("props", props);
  return {
    handleSubmit(event, props) {

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;

      event.preventDefault();

      dispatch(editUser(props.user.id, { firstName, lastName }))
      // .then(() => {
      //   ownProps.history.push(`/products`)
      // })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
