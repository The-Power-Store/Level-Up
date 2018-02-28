const router = require("express").Router();
const { Product } = require("../db/models");


module.exports = router;


router.get('/', (req, res, next) => {
  return Product.findAll // invoke this? -- KHEA
    .then(products => res.json(products))
    .catch(next);
});


router.post('/', (req, res, next) => { // who can post? -- KHEA
  Product.create(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
})

router.put('/:id', (req, res, next) => { // this would be OK to leave and not use params
  Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
  })
    .then(updates => { // update this to be meaningful if that is the case -- KHEA
      const updated = updates[1][0];
      res.json(updated);
    })
    .catch(next);
})


// consider paranoid true, also active field in that table





