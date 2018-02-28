const router = require("express").Router();
const { Order } = require("../db/models");
module.exports = router;

// all orders for admin to access and look at
router.get('/', (req, res, next) => {
  return Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

// user wants to view their own history
router.get('/orderhistory', (req, res, next) => {
  return Order.findAll({
    where: {
      userId: req.user.userId
    }
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/orderhistory/:orderId', (req, res, next) => {
  return Order.findOne({
    where: {
      id: req.params.orderId
    }
  })
    .then(order => res.json(order))
    .catch(next)
})
