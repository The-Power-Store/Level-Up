const router = require('express').Router()
const { Category } = require('../db/models')
const { isAdmin } = require('./utils')

module.exports = router;

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
})


router.post('/', isAdmin, (req, res, next) => {
  if (!isAdmin) {                                   //fill this in!!
  } else {
    Category.create(req.body)
      .then(created => res.status(201).json(created))
      .catch(next);
  }
});
