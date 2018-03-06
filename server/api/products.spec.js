const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
let agent = request.agent(app)

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products', () => {
    beforeEach(() => {
      return Product.create({
        title: 'Chocolate Frogs',
        stock: 5,
        price: 4500
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('Chocolate Frogs')
        })
    })

    it('POST /api/products', () => {
      return request(app)
        .post('/api/products')
        .send({
          title: 'Broom 2000',
          stock: 3,
          price: 25000
        })
        .expect(201)
        .then(() => {
          return Product.findOne({
            where: { title: 'Broom 2000' }
          })
        })
        .then(product => {
          expect(product).to.exist
          expect(product.title).to.equal('Broom 2000')
        })
    })

    describe('PUT /api/products/:id', () => {
      let product

      beforeEach(() => {
        return Product.create({
          title: 'Love Potion',
          stock: 15,
          price: 1599
        })
          .then(newProduct => product = newProduct)
      })

      it('saves updates to the DB', () => {
        return request(app)
          .put('/api/products/' + product.id)
          .send({
            stock: 25
          })
          .then(() => {
            return Product.findById(product.id)
          })
          .then(foundProduct => {
            expect(foundProduct).to.exist
            expect(foundProduct.stock).to.equal(25)
          })
      })
    })
  })
})
