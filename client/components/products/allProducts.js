import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../store'

class AllProducts extends Component {

  state = {
    input: '',
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    const products = this.props.products ? this.props.products.filter(product => product.title.toLowerCase().includes(this.state.input.toLowerCase())) : []

    return (
      <div className="allProducts" >
        <input
          className="search"
          placeholder="Search for a product"
          onChange={this.handleChange}
        />
        <h1 className="products-title">Products</h1>
        <div className="product-list">
          {
            products.map(product => {
              return (
                <div className="product" key={product.id}>
                  <figure className="item">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageUrl} />
                    </Link>
                    <figcaption className="caption product-details">
                      <Link to={`/products/${product.id}`}>{product.title}</Link>
                      <p>Price: ${product.price}</p>
                    </figcaption>
                  </figure>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {

  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AllProducts)
