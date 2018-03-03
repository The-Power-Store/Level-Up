import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchAddress } from '../../store';

const PersonalInfo = props => {

  const address = props.address
  return (
      <h3>Address:</h3>

    )

}


const mapStateToProps = state => {
  return {
    address: state.address,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    address(id) {
      dispatch(fetchAddress(id))
    }
  }
}
