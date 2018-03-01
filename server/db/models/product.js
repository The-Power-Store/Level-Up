const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING
  },

  stock: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      return (this.getDataValue('price') / 100)
    }
  }
})


module.exports = Product;
