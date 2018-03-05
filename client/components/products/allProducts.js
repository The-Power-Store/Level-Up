import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../store' // we're not using this --KHEA

class AllProducts extends Component {

  state = {
    input: '',
  }

  handleChange = (event) => { // if you have it like this everywhere 👍 (otherwise, pick parens or not) --KHEA
    this.setState({
      input: event.target.value
    })
  }

  render() {
    // just have the filter here instead of the ternary --KHEA
    const products = this.props.products
      ? this.props.products.filter(product => product.title.includes(this.state.input))
      : []

    return (
      <div >
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
                      // wrap the link around it all --KHEA
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

const mapStateToProps = function (state) { // removed the space --KHEA
  return {
    products: state.products
  }
}

/*
check if you're destructuring state elsewhere for MSTP --KHEA
i.e.:
const MSTP = ({ products }) => ...
 */

export default connect(mapStateToProps)(AllProducts)
