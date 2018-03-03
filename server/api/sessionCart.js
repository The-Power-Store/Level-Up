const router = require('express').Router()
const { Cart } = require('../db/models')



app.post('/',  (req, res, next)=> {
    console.log("fdjskajflkdsjalfkds", req.session)
    if(req.session.cart == undefined){
      req.session.cart = [req.body.productId]
      console.log("this is the req session", req.session.cart.quantity)
    }else{
       req.session.cart.push(req.body)
    }
    console.log("SESSION USER after cart??: ", req.session.cart);
    next();
  });


