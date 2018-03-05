const router = require('express').Router()
const { Cart } = require('../db/models')
const session = require('express-session')
const passport = require('passport')
const db = require('../db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })
module.exports = router;

passport.serializeUser((user, done) => done(null, user.id))
// passport.serializeCart((cart, done) => done(null, cart.id))

passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

  router.post('/',  (req, res, next)=> {
    // console.log("You hit the session post item route ", req.session)
    if(req.session.cart == undefined){
      //creates a cart item on the session that holds the product id as the key and the quantity as the value 
      req.session.cart={}
      req.session.cart[req.body.productId] = req.body.quantity
      
    }else{
      if(req.session.cart[req.body.productId] != undefined){
        //if the user already has one of the item in their cart, increase the quantity 
        const newquant = +req.session.cart[req.body.productId]+ 1
        console.log("new quant", newquant)
        req.session.cart[req.body.productId] = newquant
        console.log("this is the vlaue being updated", +req.session.cart[req.body.productId]+ 1 )
        console.log("ah, you already have one of that item in your cart")
      }else{
        //if they don't have one in thier cart, put one there!
        req.session.cart[req.body.productId] = req.body.quantity
      }
    }
    
    console.log("You hit the session post item route ", req.session.cart)
    next();
  });
  router.use('/',(req,res,next)=>{
    res.json(req.session.cart)
  })
  //this should also be moved to it's own /session api file 
  router.get('/session/cart/',  (req, res, next)=> {
    console.log("an unloggin user wants to see their the cart, eh?")
    return "heeey" //change this
    next();
  });


