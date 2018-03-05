import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchAllUsers, deleteAccount, editUser } from "../store"
import {Route} from 'react-router-dom';

class AdminHome extends Component {
  componentDidMount() {
    this.props.fetchUserData()
  }

  render() {
    console.log("users", this.props.users)
    return
    <div>
      <h3>What would you like to do?</h3>
      <Link to="/admin/users" component={UserUpdates}/>
      <Link to="/admin/products" component={ProductUpdates}/>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => {
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
