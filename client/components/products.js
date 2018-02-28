import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';

class Products extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (

    )
  }
}

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
