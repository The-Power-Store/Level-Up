const router = require("express").Router();
const { Order } = require("../db/models");
module.exports = router;

// all orders for admin to access and look at
router.get('/', (req, res, next) => {
  return Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

