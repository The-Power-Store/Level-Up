import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';


class Products extends Component {
  constructor(props) {
    super(props)
    state = {
      input: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(event) {
      this.setState({
        input: event.target.value
      })
    }

  render() {
    const products = this.props.products.filter(product => product.name.include(this.state.input));
    const products = this.props.products
    return (
      <div>
      <form>
        <input
        placeholder="Search for a product"
        onChange={this.handleChange}
        />
      </form>
      <h1>Products</h1>
      {

        products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <img src={product.imageUrl}/>
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

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
