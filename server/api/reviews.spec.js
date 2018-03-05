const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('User')
const Review = db.model('Review')
let agent = request.agent(app)

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  });


  describe('/api/reviews', () => {

  })
})