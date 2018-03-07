import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct, update } from '../store'

const EditProduct = props => {
  const { handleAddSubmit, handleUpdateSubmit, categories } = props
  const product = props.product[0]

  return (
    product ?
      <div>
        <form className="products-form" onSubmit={handleUpdateSubmit}>
          <label>Title</label>
          <input type="text" name="title" defaultValue={product.title} />
          <label>Description</label>
          <input type="text" name="description" defaultValue={product.description} />
          <label>Image URL</label>
          <input type="text" name="imageUrl" defaultValue={product.imageUrl} />
          <label>Stock</label>
          <input type="text" name="stock" defaultValue={product.stock} />
          <label>Price ($)</label>
          <input type="text" name="price" defaultValue={product.price} />
          <label>Category</label>
          <select name="category">
            {
              categories.map(category => (
                <option key={category.id}>{category.id}: {category.title}</option>
              ))
            }
          </select>
          <br />
          <button type="submit">Update</button>
        </form>
      </div> :
      <form className="products-form" onSubmit={handleAddSubmit}>
        <label>Title</label>
        <input type="text" name="title" />
        <label>Description</label>
        <input type="text" name="description" />
        <label>Image URL</label>
        <input type="text" name="imageUrl" />
        <label>Stock</label>
        <input type="text" name="stock" />
        <label>Price ($)</label>
        <input type="text" name="price" />
        <label>Category</label>
        <select name="category">
          {
            categories.map(category => (
              <option key={category.id}>{category.id}: {category.title}</option>
            ))
          }
        </select>
        <br />
        <button type="submit">Add</button>
      </form>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.filter(product => (
      product.id === +ownProps.match.params.id
    )),
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params


  return {
    handleAddSubmit: event => {
      event.preventDefault()

      const index = event.target.category.value.indexOf(':')
      const title = event.target.title.value
      const description = event.target.description.value
      const imageUrl = event.target.imageUrl.value
      const stock = event.target.stock.value
      const price = +event.target.price.value * 100
      const categoryId = event.target.category.value.slice(0, index)

      dispatch(createProduct({ title, description, imageUrl, stock, price, categoryId }))
      ownProps.history.push(`/home/${id}`)
    },
    handleUpdateSubmit: event => {
      event.preventDefault()

      const index = event.target.category.value.indexOf(':')
      const title = event.target.title.value
      const description = event.target.description.value
      const imageUrl = event.target.imageUrl.value
      const stock = event.target.stock.value
      const price = +event.target.price.value * 100
      const categoryId = event.target.category.value.slice(0, index)

      dispatch(update(id, { title, description, imageUrl, stock, price, categoryId }))
      ownProps.history.push(`/home/${id}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
