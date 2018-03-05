const router = require('express').Router();
const { Review } = require('../db/models');
const { makeError } = require('./utils');
const {Product, User} = require('../db/models')

module.exports = router;

router.param('id', (req, res, next, id) => {
  Review.findById(id)
    .then(review => {
      if (!review) next(makeError(404, 'review not found'));
      req.requestedReview = review;
      next();
    })
    .catch(next);
});


router.get('/', (req, res, next) => {
  if(req.query.stars) {
    Review.findAll({
      where : {
        stars : req.query.stars
      }
    })
    .then(reviews => res.json(reviews))
    .catch(next);
  } else {
    Review.findAll({
      include: [
        {model: Product, as: 'product'},
        // {model: User, as: 'user'}
      ]
    })
      .then(reviews => res.json(reviews))
      .catch(next);
  }
})


router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(created => res.status(201).json(created))
    .catch(next);
})


router.put('/:id', (req, res, next) => {
  req.requestedReview.update(req.body)
   .then(([numberOfUpdates, returnedUpdates]) => {
      const updated = returnedUpdates[0];
      res.json(updated);
    })
    .catch(next);
});


router.delete('/:id', (req, res, next) => {
  req.requestedReview.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});
