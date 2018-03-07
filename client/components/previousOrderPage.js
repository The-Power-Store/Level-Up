import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findProductsInOrder } from '../store'

class PreviousOrderPage extends Component {

  componentDidMount() {
    this.props.getOrderInfo(this.props.match.params.id)
  }

  getTotalPrice = () => {
    let total = 0

    this.props.productsInOrder.forEach(productInOrder => total += productInOrder.totalPrice)
    return total
  }


  render() {
    const { productsInOrder } = this.props
    const orderAddress = productsInOrder[0]

    return <div>
      <h1 id="tab-title">ORDER #{this.props.match.params.id}</h1>
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">SHIPPING ADDRESS</th>
            <th scope="col">PRODUCT</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">TOTAL PRICE ($)</th>
          </tr>
        </thead>
        <tbody>
          {
            productsInOrder.map(pio =>
              <tr id={pio.id}>
                <th scope="row"></th>
                <td>{pio.product.title}</td>
                <td>{pio.quantity}</td>
                <td>{pio.totalPrice}</td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          {
            orderAddress ?
              <td>
                {orderAddress.order.firstName} {orderAddress.order.lastName}
                , {orderAddress.order.address}
                , {orderAddress.order.city}
                , {orderAddress.order.state}
                , {orderAddress.order.zip}
              </td> : null
          }
          <td />
          <td />
          <th>${this.getTotalPrice()}</th>
        </tfoot>
      </table>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    productsInOrder: state.productsInOrder,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params

  return {
    getOrderInfo: id => {
      dispatch(findProductsInOrder(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousOrderPage)
