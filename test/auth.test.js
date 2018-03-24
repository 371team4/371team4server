const request = require('supertest')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const chai = require('chai')
const { app, server } = require('../index')
const config = require('../src/config/config')
const mongoose = require('mongoose')
const seed = require('../src/config/seed')

const expect = chai.expect
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
    server.close()
    done()
  })

  const validUserCredentials = JSON.parse(JSON.stringify(seed.initialUsers[0]))
  validUserCredentials.password = 'admin001'

  // deep clone the object
  const userWithBadPassword = JSON.parse(JSON.stringify(seed.initialUsers[1]))
  userWithBadPassword.password = 'badpassword'

  const userWithBadUsername = JSON.parse(JSON.stringify(seed.initialUsers[1]))
  userWithBadUsername.username = 'badName'
  userWithBadUsername.password = 'badpassword'

  describe('# POST /api/login', () => {
    it('should get valid JWT token', done => {
      debugger
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

    it('should return Authentication error when incorrect password is provided', done => {
      request(app)
        .post('/api/login')
        .send(userWithBadPassword)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Either username or password is incorrect')
          done()
        })
        .catch(done)
    })

    it('should return Authentication error when incorrect username is provided', done => {
      request(app)
      .post('/api/login')
      .send(userWithBadUsername)
      .expect(httpStatus.UNAUTHORIZED)
      .then(res => {
          expect(res.body.message).to.equal('Either username or password is incorrect')
          done()
        })
        .catch(done)
    })
  })
})
