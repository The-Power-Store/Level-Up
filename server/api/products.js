const router = require("express").Router();
const { Product } = require('../db/models');
const { isAdmin } = require('./utils')

module.exports = router;

router.get('/', (req, res, next) => {
  return Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});


router.post('/', isAdmin, (req, res, next) => {
  if (!isAdmin) {}
  else {
  Product.create(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
  }
})

router.put('/:id', (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
  })
    .then(([numOfUpdates, updatedProducts]) => {
      const updated = updatedProducts[0];
      res.json(updated);
    })
    .catch(next);
})






