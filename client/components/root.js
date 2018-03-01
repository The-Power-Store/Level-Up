import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { Homepage, ProductCategory, SingleProduct, AllProducts, Navbar } from './index.js'
import store, { fetchAllProducts, fetchCategories } from "../store";
import Routes from '../routes';

class Root extends Component {

  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    console.log(`ROOT THIS PROPS `, this.props)
    return (
      <div>
        <Navbar />
        <Routes />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/categories/:id" component={ProductCategory} />
          <Route path="/products/:id" component={SingleProduct} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products }
};

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
