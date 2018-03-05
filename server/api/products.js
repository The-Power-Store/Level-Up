const router = require('express').Router()
const { Product, ProductsInOrder, Order } = require('../db/models')
const { isAdmin } = require('./utils')

module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/order/:id', (req, res, next) => {
  ProductsInOrder.findAll({
    where: {
      orderId: req.params.id
    },
    include: [
      { model: Product, as: 'product' },
      { model: Order, as: 'order' }
    ]
  })
    .then(productOrder => {
      res.json(productOrder)
    })
    .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
    Product.create(req.body)
      .then(created => res.status(201).json(created))
      .catch(next)
})

router.put('/:id', (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
  })
    .then(([numOfUpdates, updatedProducts]) => {
      const updated = updatedProducts[0]
      res.json(updated)
    })
    .catch(next)
})
