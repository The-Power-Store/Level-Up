import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchAllUsers, deleteAccount, editUser } from "../store"
import { Link } from 'react-router-dom'

class AdminHome extends Component {
  componentDidMount() {
    this.props.fetchUserData()
  }

  render() {
   const { users, products, handleSubmit } = this.props

    console.log("users", this.props.users)
    return <div className="container">
        <h2 id="tab-title">USERS</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">USER NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <tr key={user.id}>
                <th scope="row">
                  {user.firstName} {user.lastName}
                </th>
                <td>{user.email}</td>
                <form onSubmit={handleSubmit}>
                  <td>
                    <input name="makeAdmin" type="checkbox" />
                  </td>
                  <td>
                    <input name="delete" type="checkbox">Delete</input>
                  </td>
                  <td>
                    <button type="submit">Submit!</button>
                  </td>
                </form>
              </tr>)}
          </tbody>
        </table>
        <br />
        <br />
        <div className="admin-product-cont">
          <h2 className="tab-title">PRODUCTS</h2>
          <ul>
            {products.map(product => <div key={product.id}>
                <li id="product-list">
                  <Link key={product.id} to={`/admin/product/${product.id}`}>
                    {product.title}
                  </Link>
                </li>
                <br />
              </div>)}
          </ul>
        </div>
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
    },
    handleSubmit: (event) => {

      event.preventDefault();
      if(event.target.makeAdmin) dispatch(editUser(3, {isAdmin: true}))
      if(event.target.delete) dispatch(deleteAccount(5))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
