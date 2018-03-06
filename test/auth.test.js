const request = require('supertest')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const chai = require('chai')
const expect = chai.expect
const app = require('../index')
const config = require('../config/config')
const mongoose = require('mongoose')
const seed = require('../config/seed')
const User = require('../user/user.model')

chai.config.includeStack = true

describe('## Auth APIs', () => {
  beforeEach(done => {
    debugger
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(seed.initUsersCollection())
      .then(done())
      .catch(e => console.error(e))
  })

  afterEach(done => {
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    app.close()
  })

  const validUserCredentials = {
    username: 'admin',
    password: 'admin'
  }

  const invalidUserCredentials = {
    username: 'admin',
    password: 'IDontKnow'
  }

  let jwtToken

  describe('# POST /api/login', () => {
    it('should get valid JWT token', done => {
      request(app)
        .post('/api/auth/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('token')
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok // eslint-disable-line no-unused-expressions
            expect(decoded.username).to.equal(validUserCredentials.username)
            jwtToken = `Bearer ${res.body.token}`
            done()
          })
        })
        .catch(done)
    })

    it('should return Authentication error', done => {
      request(app)
        .post('/api/login')
        .send(invalidUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Authentication error')
          done()
        })
        .catch(done)
    })
  })
})
