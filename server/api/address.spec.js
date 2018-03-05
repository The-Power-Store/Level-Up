const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('User')
const Address = db.model('Address')
const Order = db.model('Order')
let agent = request.agent(app)

describe('Address routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
})