const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  isShipping: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  isBilling: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 2],
      isAlpha: true
    }
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 00000,
      max: 99999
    }
  }
})

module.exports = Address
