const router = require('express').Router()
const { Cart } = require('../db/models')

module.exports = router

// find all items by specific cart
router.get('/', (req, res, next) => {
  const userID = req.user.id 

  console.log("shouting out from the cart api", req.user.id)
  Cart.findAll({
    where: { userId: userID }
  })
    .then(cartItems => {
      const arrOfItems = []
      cartItems.map((item) => { arrOfItems.push(item.dataValues) })
      return res.json(arrOfItems)
    })
    .catch(next)
})

// add new cart item, or if the item already is in the cart, update its quantity 
router.post('/transfer', (req, res, next) => {
  console.log("this is the cart on the session, that we are trying to transfer", req.session.cart, "for this user,", req.user)
  //PRODUCTID, quantity, userid 
  Object.keys(req.session.cart).map((key)=>{
    const cartItemToAdd = {productId:+key, userId:1, quantity:req.session.cart[key]}
    Cart.create(cartItemToAdd).
    then(createdItem => {
      console.log("this is the item we just added to the cart", createdItem)
      return res.status(201).json(createdItem)})
    .catch(next)
  })
   
})

router.post('/', (req, res, next) => {
  console.log("FROM THE BACKEND, the request looks like ", req.body)
  Cart.findOne({ where: { userId: req.body.userId, productId: req.body.productId } })
    .then(foundArr => {
      if (foundArr != null) {
        console.log("The item is already in the caret, so increase it quantity")
        const newquant = +req.body.quantity + foundArr.quantity

        console.log("new amount", newquant)
        return foundArr.update({ quantity: newquant })
         
      } else {
        console.log("The item does not exist in the cart yet")
        return Cart.create(req.body) //this should be a product and it's information
      }
    })
    .then(createdItem => res.status(201).json(createdItem))
    .catch(next)
})

//update cart item, might not need this 
router.put('/:cartItemId', (req, res, next) => {
  Cart.update(req.body, {
    where: { id: req.params.cartItemId },
    returning: true
  })
    .then(updates => { //make more meaningful and check if this actually makes sense
      const updated = updates[1][0]
      res.json(updated)
    })
    .catch(next)
})

// delete all items from cart aka delete cart
router.delete('/', (req, res, next) => {
  const userId = req.user.id

  Cart.destroy({
    where: { userId: userId }
  })
    .then((rowsDeleted) => {
      res.sendStatus(202)
    })
    .catch(next)
})

// delete item from cart
router.delete('/:cartItemId', (req, res, next) => {
  Cart.destroy({
    where: { id: req.params.cartItemId }
  })
    .then((rowsDeleted) => {
      res.sendStatus(202)
    })
    .catch(next)
})