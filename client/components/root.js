import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {connect} from 'react-redux'

import {Homepage, ProductCategory, SingleProduct, AllProducts} from './index.js'

import store, {fetchAllProducts, fetchCategories} from "../store";

class Root extends Component {

  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/products" component={AllProducts} />
            <Route path="/categories/:id" component={ProductCategory} />
            <Route path="/product/:id" component={SingleProduct} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchAllProducts);
    dispatch(fetchCategories);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
