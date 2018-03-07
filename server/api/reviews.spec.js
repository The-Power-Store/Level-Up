const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Review = db.model('review')
let agent = request.agent(app)

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/reviews', () => {
    const garrysReview = 'I was invisible for days'

    beforeEach(() => {
      return Review.create({
        review: garrysReview
      })
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(garrysReview)
        })
    })

    it('POST /api/reviews and saves it to the DB!!', () => {
      return request(app)
        .post('/api/reviews')
        .send({
          content: 'this dragon has the worst temperament. i want a refund',
          stars: 1
        })
        .expect(201)
        .then(() => {
          return Review.findOne({
            where: {
              content:
                "this dragon has the worst temperament. i want a refund",
              stars: 1
            }
          })
        })
        .then(review => {
          expect(review).to.exist
          expect(review.content).to.equal("this dragon has the worst temperament. i want a refund")
        })
    })

    it('does not create a review without content', () => {
      return request(app)
        .post('/api/reviews')
        .send({})
        .expect(500)
    })
  })
})
