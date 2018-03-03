const router = require('express').Router()
const { Address } = require('../db/models/address')

module.exports = router

router.get('/:id', (req, res, next) => {
  Address.findById(req.params.id)
    .then(address => {
      res.json(address)
    })
    .catch(next);

})

router.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Address.update(req.body, {
    where : {
      id: req.params.id
    },
    returning: true
  })
  .then(([numOfUpdates, updatedItems]) => {
    const updated = updatedItems[0]
    res.json(updated)
  })
  .catch(next);
})

