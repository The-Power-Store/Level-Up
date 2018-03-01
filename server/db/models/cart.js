const Sequelize = require('sequelize')
const Product = require("./product")
const db = require('../db')

const Cart = db.define('cart',{
    quantity:{
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
        }
    }
})

 Cart.cartTotal = async function(userId){
    let total = 0
    const userCart = await this.findAll({where:{UserId:d}})

    for(let items in userCart){
        let item = await Product.findById(items.id)
        total = total + items.price * item.quantity
    }
    return total 
}

module.exports = Cart