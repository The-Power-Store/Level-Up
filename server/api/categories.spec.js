const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Category = db.model('category')
let agent = request.agent(app)

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
})
