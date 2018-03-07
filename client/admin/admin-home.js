import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { fetchAllUsers, deleteAccount, editUserInUsers } from "../store"

class AdminHome extends Component {
  componentDidMount() {
    this.props.fetchUserData()
  }

  render() {
    const { users, products, handleAdminSubmit, handleDeleteSubmit } = this.props

    console.log("users", this.props.users)
    return <div className="container">
        <h2 id="tab-title">USERS</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">USER NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">IS ADMIN?</th>
              <th scope="col">UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {users.length && users.map(user => <tr key={user.id}>
                <th scope="row">
                  {user.firstName} {user.lastName}
                </th>
                <td>{user.email}</td>
                {user.isAdmin ? <td>TRUE</td> : <td>FALSE</td>}
                <div>
                  <td>
                    <button onClick={event => handleAdminSubmit(event, user.id)}>
                      Make Admin
                    </button>
                  </td>
                  <td>
                    <button onClick={event => handleDeleteSubmit(event, user.id)}>
                      Delete User
                    </button>
                  </td>
                </div>
              </tr>)}
          </tbody>
        </table>
        <br />
        <br />
        <div className="admin-product-cont">
          <h2 className="tab-title">PRODUCTS</h2>
          <button>
            <Link to="/admin/product/0">Add Product</Link>
          </button>
          {/* <Link className="add-product-btn" to="/admin/product/0"><h4>Add Product</h4></Link> */}
          <ul>
            {products.map(product => <div key={product.id}>
                <li id="product-list">
                  <Link key={product.id} exact to={`/admin/product/${product.id}`}>
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
    handleAdminSubmit: (event, id) => {
      dispatch(editUserInUsers(id, { isAdmin: true }))
      dispatch(fetchAllUsers());
    },
    handleDeleteSubmit: (event, id) => {
      dispatch(deleteAccount(id))
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
