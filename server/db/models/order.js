const Sequelize = require('sequelize')
const db = require('../db')
const Product = require("./product")

const Order = db.define('order', {
    status: {
       type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
       defaultValue: 'created'
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
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
          max: 2,
          min: 2,
          isAlpha: true
        }
      },
      zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          max: 5,
          min: 5
        }
    }

})

// probs need to re work on this
// Order.total() = function() {
//     let total = 0;

//     const orderItems = await Order.findAll({where:{id:userId}})

//     for(items in orderItems){
//         let itemPrice = await Product.findById(items.id)
//         total = total + items.price * Product.quantity
//     }

//     return total 
// }

module.exports = Order 