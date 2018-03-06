import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { fetchAllUsers, deleteAccount, editUser } from "../store"

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
          {
            users.map(user => <tr key={user.id}>
              <th scope="row">
                {user.firstName} {user.lastName}
              </th>
              <td>{user.email}</td>
              <form onSubmit={(event) => handleSubmit(event, user.id)}>
                <div>
                  <td>
                    <label>Make Admin</label>
                    <input name="makeAdmin" type="checkbox" />
                  </td>
                  <td>
                    <label>Delete User</label>
                    <input name="delete" type="checkbox" />
                  </td>
                  <td>
                    <button type="submit">Submit!</button>
                  </td>
                </div>
              </form>
            </tr>)
          }
        </tbody>
      </table>
      <br />
      <br />
      <div className="admin-product-cont">
        <h2 className="tab-title">PRODUCTS</h2>
        <button>
          <Link to="/admin/product/0">
            Add Product
            </Link>
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
    handleSubmit: (event, id) => {
      console.log(event.target)
      event.preventDefault();
      if (event.target.makeAdmin) dispatch(editUser(id, { isAdmin: true }))
      else if (event.target.delete) dispatch(deleteAccount(id))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
