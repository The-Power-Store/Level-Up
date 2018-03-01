import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';

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
    console.log(`ALL PRODUCTS PROPS:`, this.props)
    const products = this.props.products ? this.props.products.filter(product => product.title.includes(this.state.input)) : [];

    return (
      <div>
        <input
          placeholder="Search for a product"
          onChange={this.handleChange}
        />
        <h1>Products</h1>
        {
          products.map(product => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <img src={product.imageUrl} />
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = function (state) {

  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AllProducts);
