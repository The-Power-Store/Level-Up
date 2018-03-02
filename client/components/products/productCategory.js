import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../../store'

class ProductCategory extends Component {
  state = {
    input: ''
  };

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  render() {

    let category = this.props.categories ? this.props.categories.filter(category =>
      category.id === +this.props.match.params.id
    ) : [];

    let products = this.props.products ? this.props.products.filter(product =>
      product.categoryId === +this.props.match.params.id
    ) : [];

    return (
      <div>
        <input
          placeholder='Search for a product'
          onChange={this.handleChange}
        />

        <h1>{category.length ? <div>{category[0].title}</div> : <div />}</h1>
        <p>{category.length ? <div>{category[0].description}</div> : <div />}</p>

        {
          products.map(product => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <img src={product.imageUrl} />
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    products: state.products,
    categories: state.categories
  };
};

export default connect(mapStateToProps)(ProductCategory);