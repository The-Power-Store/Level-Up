import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchAllProducts } from '../store';

class Products extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.fetchInitialData();
  }


  render() {
    return (
            //jsx here
    )
  }

}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  fetchInitialData : () => {
    dispatch(fetchAllProducts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
