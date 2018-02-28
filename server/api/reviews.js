const router = require("express").Router();
const { Review } = require("../db/models");
module.exports = router;

// spacing -- KHEA

// you did params in users but not here? -- KHEA

router.get('/', (req, res, next) => { // consider finding all reviews above X stars. req.query. How to add ot findAll? -- KHEA
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
})

router.post('/:id', (req, res, next) => { // anyone can post -- KHEA
  Review.create(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
})


router.put("/:id", (req, res, next) => { // single vs double quotes -- KHEA
  Review.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .then(updates => { // if you keep this, destructure and give meaningful names -- KHEA
      const updated = updates[1][0];
      res.json(updated);
    })
    .catch(next);
});


router.delete("/:id", (req, res, next) => {
  Review.findById(req.params.id)
    .then(found => found.destroy())
    // send a response!!! -- KHEA
    .catch(next);
});
