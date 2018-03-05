import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers, deleteAccount, editUser } from "../store";

class AdminHome extends Component {
  componentDidMount() {
    this.props.fetchUserData();
  }

  render() {
    console.log("users", this.props.users);
    return <div>Here</div>;
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: () => {
      dispatch(fetchAllUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
