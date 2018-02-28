const router = require('express').Router()
module.exports = router


router.use('/users', require('./users'))
rouer.use('/products', require('./products')); // keep changing router but not working -- ACTION ITEM -- KHEA
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'))

// whitespace :D -- KHEA


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
