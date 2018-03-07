import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import store from '../store'
import { createReview, fetchReviews } from '../store/reviews'

const ReviewForm = (props) => {
  const { user, product, handleSubmit } = props

  return (
    <div className="review-form">
      <h3>Submit an Honest Review</h3>
      <form onSubmit={(event) => handleSubmit(event, user.id)} >
        <div>
          <label>Number of Stars</label>
          <select name="stars">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Review</label>
          <input name="content" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(event, id) {
      event.preventDefault()

      const stars = event.target.stars.value
      const content = event.target.content.value
      const productId = ownProps.match.params.id
      const userId = id

      dispatch(createReview({ stars, content, productId, userId }))
      dispatch(fetchReviews())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm))