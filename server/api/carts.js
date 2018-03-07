const router = require('express').Router()
const { Cart, User } = require('../db/models')

module.exports = router

// find all items by specific cart
router.get('/', (req, res, next) => {
  const userID = req.user.id

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
  Object.keys(req.session.cart).map((key) => {
    User.findOne({ where: { email: Object.keys(req.body)[0] } })
      .then(user => {
        const cartItemToAdd = { productId: +key, userId: user.id, quantity: req.session.cart[key] }

        Cart.create(cartItemToAdd)
          .then(createdItem => res.status(201).json(createdItem))
      })
      .catch(next)
  })
})

router.post('/', (req, res, next) => {
  Cart.findOne({ where: { userId: req.body.userId, productId: req.body.productId } })
    .then(foundArr => {
      if (foundArr != null) {
        const newquant = +req.body.quantity + foundArr.quantity

        return foundArr.update({ quantity: newquant })
      } else {
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