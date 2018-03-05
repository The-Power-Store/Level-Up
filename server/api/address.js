const router = require('express').Router()
const { Address } = require('../db/models')

module.exports = router

router.get('/user/:id', (req, res, next) => {
  Address.findOne({
    where: {
      userId: req.params.id
    }
  })
    .then(address => {
      res.json(address)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Address.findById()
    .then(address => {
      res.json(address)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(next)
})

router.put('/user/:id', (req, res, next) => {
  Address.update(req.body, {
    where: {
      userId: req.params.id
    },
    returning: true
  })
    .then(([numOfUpdates, updatedItems]) => {
      const updated = updatedItems[0]
      res.json(updated)
    })
    .catch(next)
})