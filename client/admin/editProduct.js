import React from 'react'
import { connect } from 'react-redux'
import { createProduct, update } from '../store'

const EditProduct = props => {
  console.log('iinnnisssddee')
  return (
    <div>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products.find(product => (
      product.id === ownProps.match.params.id
    ))
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (event) => {
      event.preventDefault()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
