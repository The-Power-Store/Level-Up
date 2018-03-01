const Sequelize = require('sequelize')
const db = require('../db')

const ProductsInOrder = db.define('productsInOrder',{
    quantity: {
        type: Sequelize.INTEGER,
        validate:{
            notEmpty:false
        }
    },
    price: {
        type: Sequelize.DECIMAL
    }
})

module.exports = ProductsInOrder