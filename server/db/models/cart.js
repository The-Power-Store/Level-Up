// const crypto = require('crypto')
const Sequelize = require('sequelize')
const Product = require("./product")
const db = require('../db')


const Cart = db.define('Cart',{
    quantity:{
        type: SEQUALIZE.INTEGER,
        allowNull:false,
        validate:{

        }
    },
    productId:{
        type:SEQUALIZE.INTEGER
    },
    orderId:{
        type:SEQUALIZE.INTEGER
    }
})

Cart.cartTotal = function(userId){
    let total = 0

    const userCart = await this.findAll({where:{id:userId}})

    for(items in userCart){
        let itemPrice = await Product.findById(items.id)
        total = total + items.price * Product.quantity
    }
    return total 

}

module.exports={cart}