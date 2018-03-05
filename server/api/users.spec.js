/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('User')
let agent = request.agent(app);

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('POST /api/users and saves the user to the DB', () => {
      return request(app)
        .post('/api/users')
        .send({
          email: 'myemail@my.mail',
          password: '1234'
        })
        .expect(201)
        .then(() => {
          return User.findOne({
            where: { email: 'myemail@my.mail' }
          })
        })
        .then(user => {
          expect(user).to.exist;
          expect(user.email).to.equal('myemail@my.mail');
        })
    });

    it('does not create a new user without an email', () => {
      return request(app)
        .post('/api/users')
        .send({})
        .expect(500);
    })
    // it('DELETE /api/users and removes the user from the DB', () => {
    //   return request(app)
    // })

  }) // end describe('/api/users')
}) // end describe('User routes')
