import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchAllUsers, deleteAccount, editUser } from "../store"
import { Link } from 'react-router-dom'

class AdminHome extends Component {
  componentDidMount() {
    this.props.fetchUserData()
  }

  render() {
   const { users, products } = this.props

    console.log("users", this.props.users)
    return <div>
        <h3>What would you like to do?</h3>
        <h3>Users</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">USER NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">MAKE ADMIN?</th>
              <th scope="col">DELETE</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map(user =>
             <tr id={user.id}>
                <th scope="row">{user.firstName} {user.lastName}</th>
                <td>{user.email}</td>
                <td><input type="checkbox"/></td>
                <td></td>
              </tr>
            )
          }
          </tbody>
        </table>
        <Link to="/admin/products" />
      </div>;
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
