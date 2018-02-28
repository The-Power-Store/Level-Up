const router = require("express").Router();
const { Product } = require("../db/models");
module.exports = router;

router.get('/', (req, res, next) => {
  return Product.findAll()
    .then(products => res.json(products))
    .catch(next);
})

router.post('/:id', (req, res, next) => {
  Product.create(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
  })
    .then(updates => {
      const updated = updates[1][0];
      res.json(updated);
    })
    .catch(next);
})


router.put('/:id', (req, res, next) => {    ///this should be used to decrement the stock after an order submits,i found this online but dont know if this works??
  Product.findById(req.params.id)
    .then(product => {
      return product.decrement(['stock'], { by: 1 });
    })
    .catch(next);
})




