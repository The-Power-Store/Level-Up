const router = require('express').Router()
const { Cart } = require('../db/models')

app.use('/', (req, res, next) => {
  if (req.session.cart == undefined) {
    req.session.cart = [req.body.productId]
  } else {
    req.session.cart.push(req.body)
  }
  next()
})