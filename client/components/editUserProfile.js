import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store'

export const EditUserProfile = props => {
  const { user } = props;

  return <div>
        <form onSubmit={event => props.handleSubmit(event, props.user.id)}>
          First Name:
          <input type="text" name="firstName" />
          Last Name:
          <input type="text" name="lastName" />
          <button type="submit">Update Profile</button>
        </form>
    </div>
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    handleSubmit(event,id) {

      event.preventDefault();

      dispatch(editUser(id, {}))
      ownProps.history.push('/homepage');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)
