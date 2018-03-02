const router = require("express").Router();
const { Review } = require("../db/models");
module.exports = router;



router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
})


router.put('/:id', (req, res, next) => {
  Review.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .then(updates => {
      const updated = updates[1][0];
      res.json(updated);
    })
    .catch(next);
});


router.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(found => found.destroy().sendStatus(204))
    .catch(next);
});
