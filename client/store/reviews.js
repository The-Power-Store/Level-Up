import axios from 'axios'

//action types
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_NEW_REVIEW = 'ADD_NEW_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

//action creators
const getReviews = reviews => ({ type: GET_REVIEWS, reviews })
const addNewReview = review => ({ type: ADD_NEW_REVIEW, review })
const updateReview = review => ({ type: UPDATE_REVIEW, review })
const deleteReview = id => ({ type: DELETE_REVIEW, id })

//thunks
export function fetchReviews() {
  return dispatch => {
    axios
      .get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        dispatch(getReviews(reviews))
      })
      .catch(err => console.error('error fetching reviews', err))
  }
}

export function createReview(review) {
  return dispatch => {
    axios
      .post('/api/reviews', review)
      .then(res => res.data)
      .then(review => {
        dispatch(addNewReview(review))
      })
      .catch(err => console.error("error creating review", err))
  }
}

export function editReview(id, review) {
  return dispatch => {
    axios
      .put(`/api/reviews/${id}`, review)
      .then(res => res.data)
      .then(review => {
        dispatch(updateReview(review))
      })
      .catch(err => console.error("error editing review", err))
  }
}

export function removeReview(id) {
  return dispatch => {
    axios
      .delete(`/api/reviews/${id}`)
      .then(() => {
        dispatch(deleteReview(id))
      })
      .catch(err => console.error("error deleting review", err))
  }
}

//reducer
export default function reviewsReducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_NEW_REVIEW:
      return [...state, action.review]
    case UPDATE_REVIEW:
      return state.map(review => (
        action.review.id === review.id ? action.review : review
      ))
    case DELETE_REVIEW:
      return state.filter(review => (
        action.id !== review.id
      ))
    default:
      return state
  }
}