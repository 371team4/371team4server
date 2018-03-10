const request = require('supertest')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const chai = require('chai')
const expect = chai.expect
const { app, server } = require('../index')
const config = require('../config/config')
const mongoose = require('mongoose')
const seed = require('../config/seed')

chai.config.includeStack = true

describe('## Auth APIs', function () {
  this.timeout(15000)
  beforeEach(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.clearUsersCollection()
        await seed.seedUsersCollection()
        done()
      })
      .catch(e => {
        throw new Error(e)
      })
  })

  afterEach(done => {
    // may need to enable these once mocha watch is working
    //mongoose.models = {}
    //mongoose.modelSchemas = {}
    //mongoose.connection.close()
    server.close()
    done()
  })

  const validUserCredentials = {
    username: 'admin',
    password: 'admin'
  }

  const invalidUserCredentials = {
    username: 'admin',
    password: 'IDontKnow'
  }

  describe('# POST /api/login', () => {
    it('should get valid JWT token', done => {
      request(app)
        .post('/api/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('token')
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok // eslint-disable-line no-unused-expressions
            expect(decoded.username).to.equal(validUserCredentials.username)
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
