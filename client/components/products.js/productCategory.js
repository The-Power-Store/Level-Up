import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store from '../../store'

class productCategory extends Component {
  state = {
    input: ''
  };

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  render() {
    const products = this.props.products.filter(product =>
      product.categoryId === this.props.match.params.id
    );
    const category = this.props.categories.filter(category =>
      category.id === this.props.match.params.id
    )
    return (
      <div>
          <input
            placeholder='Search for a product'
            onChange={this.handleChange}
          />
        <h1>{category.title}</h1>
        <p>{category.description}</p>

        {products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <img src={product.imageUrl} />
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    products: state.products,
    categories: state.categories
  };
};

export const ProductCategory = connect(mapStateToProps)(ProductCategory);
