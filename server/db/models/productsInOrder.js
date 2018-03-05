const Sequelize = require('sequelize')
const db = require('../db')

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
});

module.exports = ProductsInOrder
