const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Address = db.model('address')
const Order = db.model('order')
let agent = request.agent(app)

describe('Address routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
})
