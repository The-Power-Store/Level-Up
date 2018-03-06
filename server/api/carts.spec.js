const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Cart = db.model('cart')

let agent = request.agent(app)

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
})
