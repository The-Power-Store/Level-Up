import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { editUser, fetchUserAddress, getOrdersThunk } from "../store"
import { withRouter, Link } from "react-router-dom"
import { isAdmin } from "../../server/api/utils"
import { AdminHome } from './index'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.getUserInfo(this.props.location.pathname.slice(6))
  }

  render() {
    const { user, address, reviews, handleSubmit, orders } = this.props

    return (
      <div className="container" className="profile-page">
        {user.firstName ? (
          <div id="welcome-header">
            <h1>Welcome back {user.firstName}!</h1>
          </div>
        ) : (
          <div id="welcome-header">
            <h3>Welcome, {user.email}</h3>
            <h5 id="title">Please take a minute to complete your profile:</h5>

            <form onSubmit={handleSubmit}>
              First Name:
              <input type="text" name="firstName" />
              Last Name:
              <input type="text" name="lastName" />
              <button type="submit">Update Profile</button>
            </form>
          </div>
        )}
        <div className="row">
          <div className="col-md-4">
            {address ? (
              <div>
                <h3 id="title">Personal Info:</h3>
                <h5>
                  Address: {address.address} {address.city} {address.state}{" "}
                  {address.zip}
                </h5>
                <Link to={`/user/editProfile/${user.id}`}>
                  Add/Update Your Info
                </Link>
              </div>
            ) : (
              <Link to={`/user/editProfile/${user.id}`}>
                Add/Update Your Info
              </Link>
            )}
          </div>

          { user.isAdmin ? (
            <AdminHome />
          ) : (
            <div>
              <div className="col-md-4">
                {reviews.length > 0 ? (
                  <h3 id="title">Your reviewed products: </h3>
                ) : (
                  <h3 id="title">You have not reviewed anything yet!</h3>
                )}
                {reviews.length > 0
                  ? reviews.map(review => (
                      <div key={review.id}>
                        <h5>{review.product.title}</h5>
                        <p>---{review.stars} Stars</p>
                        <p>---{review.content}</p>
                        <br />
                      </div>
                    ))
                  : null}
              </div>
              <div className="col-md-4">
                {orders.length > 0 ? (
                  <h3 id="title">Order-History:</h3>
                ) : (
                  <h3 id="title">You have no previous orders.</h3>
                )}
                {orders.length > 0
                  ? orders.map(order => (
                      <div key={order.id}>
                        <Link to={`/orders/${order.id}`}>
                          OrderId: {order.id}
                        </Link>
                        <br />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    address: state.address,
    reviews: state.reviews.filter(
      review => review.userId === +ownProps.location.pathname.slice(6)
    ),
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const userId = +ownProps.location.pathname.slice(6)

  return {
    getUserInfo: userId => {
      dispatch(fetchUserAddress(userId))
      dispatch(getOrdersThunk())
    },
    handleSubmit: event => {
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value

      event.preventDefault()

      dispatch(editUser(userId, { firstName, lastName }))
      window.location.reload()
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserHome)
)
