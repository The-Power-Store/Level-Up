import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct, update } from '../store'

const EditProduct = props => {
  console.log(`props product`, props.product);
  return (
    <div>
      <form>
        <label>Title</label>
        <input />
        <label>Description</label>
        <input />
        <label>Image URL</label>
        <input />
        <label>Stock</label>
        <input />
        <label>Price</label>
        <input />
      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.filter(product => (
      product.id === +ownProps.match.params.id
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
