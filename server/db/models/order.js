const Sequelize = require('sequelize')
const db = require('../db')
const Product = require("./product");

const Order = db.define('order', {
    status: {
       type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
       defaultValue: 'created'
    },
    // look into isEmpty -- KHEA
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
          max: 2, // same as below -- KHEA
          min: 2,
          isAlpha: true
        }
      },
      zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          max: 5, // look into `len` -- KHEA
          min: 5
        }
    }

})

Order.hook('beforeUpdate', function(Order) {
  return Product.findAll({
    where: {
      orderId: Order.id
    }
  })
    .then(products => {
      products.forEach(product => {
       product.decrement('stock'); // should be saving but double check (test it with an actual test) -- KHEA
      });
    })
    .catch(console.error);
});


// probs need to re work on this
// Order.total() = function() {
//     let total = 0;

//     const orderItems = await Order.findAll({where:{id:userId}})

//     for(items in orderItems){
//         let itemPrice = await Product.findById(items.id) --> look into that new table you made (productsInOrder) -- KHEA
//         total = total + items.price * Product.quantity
//     }

//     return total
// }

module.exports = Order
