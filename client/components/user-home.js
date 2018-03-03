import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editUser, fetchUserAddress} from '../store'
import {withRouter} from 'react-router-dom'
// import OrderHistory from './index'
import PersonalInfo from './index'
/**
 * COMPONENT
 */
class UserHome extends Component {

    componentDidMount() {
      this.props.getUserInfo(this.props.location.pathname.slice(6));
    }


    render() {

    const {user, address, reviews} = this.props;

      return (
        <div>
          {user.firstName ?
          <div>
            <h3>Welcome back {user.firstName}!</h3>
            <h5>Address: {address.address} {address.city} {address.state} {address.zip}</h5>
          </div>
          :<div>
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
        </div>
      )
    }
};

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    address: state.address,
    reviews: state.reviews.filter(review => review.userId === +ownProps.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  const userId = ownProps.location.pathname.slice(6);
  console.log('IdInUser-home', userId)
  return {
    getUserInfo: (userId) => {
      dispatch(fetchUserAddress(userId))
    },
    handleSubmit: (event, id) => {

      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;

      event.preventDefault();

      dispatch(editUser(id, { firstName, lastName }))
      window.location.reload();
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome));

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   user: PropTypes.object
// };
