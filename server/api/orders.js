const router = require("express").Router();
const { Order } = require("../db/models");
module.exports = router;

function createError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}
// all orders for admin to access and look at
router.get('/', (req, res, next) => {
  if (!req.user) next(createError(401, 'WAIT, you need to log in doofus'))
  const query = req.user.isAdmin ? {} : { where: { userId: req.user.userId } }
  return Order.findAll(query)
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next)
})

//create order
//create products in order
// move join table to cart and product 
// order has cart id 

//needs to pull in cart info from database or session and make that req.body
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.status(201).send(order))
    //ProductInOrder.create
    // req.user.cart
    //loop through each item in users cart to add it to productinorder with correct
    // products and persist the quantity and price at the time order was created
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.orderId
    },
    returning: true
  })
    //need to make more readable/meaningful 
    .then(updates => {
      const updatedStatus = updates[1][0];
      res.json(updatedStatus);
    })
    .catch(next);
})


