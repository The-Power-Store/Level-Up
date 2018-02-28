// const crypto = require('crypto') // why am I here?!?! -- KHEA
const Sequelize = require('sequelize')
const Product = require("./product")
const db = require('../db')


const Cart = db.define('Cart',{ // a common pattern is all lowercase. Also just be consistent -- KHEA
    quantity:{
        type: SEQUALIZE.INTEGER, // Spelling and also look at line 2??? -- KHEA
        allowNull:false,
        validate:{

        }
    },
    productId:{ // do associations in your index.js which will make this attribute for you -- KHEA
        type:SEQUALIZE.INTEGER
    },
    orderId:{ // *associate* to the user instead -- KHEA
        type:SEQUALIZE.INTEGER
    }
})

//this will need tweaking. I'm not sure it will work as of right now.
//however I think the idea is sound.  

Cart.cartTotal = function(userId){
    let total = 0

    // keep this and make it work (love the async/await syntax around here!! -- KHEA
    const userCart = await this.findAll({where:{id:userId}})  // id? or userId (which we will add)?? -- KHEA

    for(let items in userCart){ // also, consider that it might not be on the object but rather its parent -- KHEA
        let item = await Product.findById(items.id) // use const. Is this going to be a price? -- KHEA
        total = total + item.price * item.quantity // changes --- KHEA
    }
    return total 

}

module.exports= Cart // change this -- KHEA