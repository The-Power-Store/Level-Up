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
  return Order.findOne({
    where: {
      id: req.params.orderId
    }
  })
    .then(order => res.json(order))
    .catch(next)
})