const Sequelize = require('sequelize')
const Product = require("./product")
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER
  }
})

Cart.cartTotal = async function (userId) {
  let total = 0
  const userCart = await this.findAll({ where: { UserId: id } })

  for (let items in userCart) {
    let item = await Product.findById(items.id)
    total = total + items.price * item.quantity
  }
  return total
}

Cart.destroyCart = function (userId) {
  return this.destroy({
    where: {
      userId: userId
    }
  })
    .then(rowsDeleted => {
      console.log('da rows were deleted ', rowsDeleted)
    })
}

module.exports = Cart