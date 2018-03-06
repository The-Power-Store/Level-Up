import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../store'

class ProductCategory extends Component {
  state = {
    input: ''
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    let category = this.props.categories ? this.props.categories.filter(category =>
      category.id === +this.props.match.params.id
    ) : []

    let products = this.props.products ? this.props.products.filter(product =>
      product.categoryId === +this.props.match.params.id && product.title.toLowerCase().includes(this.state.input.toLowerCase())
    ) : []

    return (
      <div>
        <div className="products-header allProducts">
          <input
            placeholder='Search for a product'
            onChange={this.handleChange}
          />
          <div className="products-header">
            <h1>{category.length ? <div>{category[0].title}</div> : <div />}</h1>
            <div>{category.length ? <p>{category[0].description}</p> : <div />}</div>
          </div>
        </div>

        <div className="product-list allProducts">
          {
            products.map(product => {
              return (
                <div className="product" key={product.id}>
                  <figure className="item">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageUrl} />
                    </Link>
                    <figcaption className="caption">
                      <div className="product-details">
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                        <p>Price: ${product.price}</p>
                      </div>
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
    products: state.products,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(ProductCategory)
