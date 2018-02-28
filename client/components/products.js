import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';


class Products extends Component {
  constructor(props) {
    super(props)
    state = { // stage-2 allows us to just say state = {}; this.state otherwise -- KHEA
      input: '',
    }
    }
    // this.handleChange = this.handleChange.bind(this);
  }

    handleChange = (event) => { // can do arrow for lexical scope (don't need to bind) stage-2 -- KHEA
      this.setState({
        input: event.target.value
      })
    }

  render() {
    const products = this.props.products.filter(product => product.name.match(this.state.input)); // try includes -- KHEA
    if (!products) return <div> No products sorry </div>
    // const products = this.props.products
    // search component that is reusable (for reviews, etc, etc) that takes in a handleChange that is passed in from parent -- KHEA
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

// if I dispatch some action to tell me what should be shown (filtered)
// dispatch runs a reducer (updates the store) --> either hold filter keyphrase or hold filtered products

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
