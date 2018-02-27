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
  price: {
    type: Sequelize.DECIMAL(8, 2),
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Product
