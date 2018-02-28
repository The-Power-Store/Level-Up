const router = require("express").Router();
const { Product } = require("../db/models");


module.exports = router;


router.get('/', (req, res, next) => {
  return Product.findAll
    .then(products => res.json(products))
    .catch(next);
});


router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(created => res.status(201).json(created))
  .catch(next);
})

router.put('/:id', (req, res, next) => {
  Product.update(req.body, {
    where : {
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






