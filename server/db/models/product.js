const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('Product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT // this means you will NOT be searching by this field -- KHEA
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(8, 2),
    allowNull: false // consider min validation -- KHEA
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 30 // for now OK, consider 0. Also, min validation? -- KHEA
  }
}) 


module.exports = Product;
