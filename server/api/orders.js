//routes for cart. Make them :D When an order is made all items in the cart are deleted (moved to the order) -- KHEA
// do checks for if logged in then go to db, if not look at session -- KHEA

const router = require("express").Router();
const { Order } = require("../db/models");
module.exports = router;

function createError(status, message) { // consider pulling out into a util file to be used all over
  const error = new Error(message)
  error.status = status
  return error
}
// all orders for admin to access and look at
router.get('/', (req, res, next) => {
  if (!req.user) next(createError(401, 'WAIT, you need to log in doofus')) // consider pulling out as well -- KHEA
  const query = req.user.isAdmin ? {} : { where: { userId: req.user.userId } }
  return Order.findAll(query)
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  return Order.findOne({ // why return? findById -- KHEA
    where: {
      id: req.params.orderId
    }
  })
    .then(order => res.json(order))
    .catch(next)
})

// put -- to update status --  KHEA
// post to actually make an order (which will hook into your cart) -- KHEA