const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')
const Cart = require('./cart')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    defaultValue: 'created',
    validate: {
      notEmpty: false
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
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
      min: 10000,
      max: 99999
    }
  },
  email: {
    type: Sequelize.STRING
  }
}
)

Order.hook('beforeUpdate', function (Product) {
  return Product.findAll({
    where: {
      orderId: Order.id
    }
  })
    .then(products => {
      products.forEach(product => {
        product.decrement('stock')
      })
    })
    .catch(console.error)
})

Order.hook('afterCreate', function (Order) {
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

module.exports = Order
