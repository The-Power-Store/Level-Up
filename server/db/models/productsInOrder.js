const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Cart = require('./cart')

const ProductsInOrder = db.define("productsInOrder", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: false
    }
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue("price") / 100;
    }
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.getDataValue("price") * this.getDataValue("quantity")) / 100;
    }
  }
})

ProductsInOrder.hook('afterCreate', function (Order) {
  return Cart.destroy({
    where: {
      userId: Order.userId
    }
  })
    .then(rowsDeleted => {
      console.log('da rows were deleted ', rowsDeleted)
    })
    .catch(console.error)
})

module.exports = ProductsInOrder
