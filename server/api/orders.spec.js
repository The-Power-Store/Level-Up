const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('User')
const Cart = db.model('Cart')
const Order = db.model('Order')
let agent = request.agent(app)

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
})