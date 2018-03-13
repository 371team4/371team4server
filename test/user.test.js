const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai')
const { app, server } = require('../index')
const config = require('../src/config/config')
const seed = require('../src/config/seed')

const expect = chai.expect
chai.config.includeStack = true

let token

describe('## User APIs', function () {
  this.timeout(15000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initUsersCollection()
        try {
          const res = await request(app)
            .post('/api/login')
            .send({ username: 'test', password: 'admin001' })
          if (res) {
            token = res.body.token
            done()
          }
        } catch (e) {
          console.log(e)
          done()
        }
      })
      .catch(e => console.error(e))
  })

  after(done => {
    server.close()
    done()
  })

  const user = {
    username: 'KK123',
    password: '1234567890',
    email: 'email@email.com'
  }

  const noNameUser = {
    password: 'helloworld'
  }

  const noPasswordUser = {
    username: 'admin'
  }

  describe('# POST /api/users', () => {
    it('should create a new user', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username)
          //console.log(jwt.verify(JSON.stringify(res.body.password), config.jwtSecret))
          //expect(res.body.password).to.equal(user.password)
          user._id = res.body._id
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/users', () => {
    it('should create a new user', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(noNameUser)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal("'username' is required and 'email' is required")
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/users', () => {
    it('should create a new user', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(noPasswordUser)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal("'password' is required and 'email' is required")
          done()
        })
        .catch(done)
    })
  })

  describe('# PUT /api/users/:userId', () => {
    it('should update user details', done => {
      user.password = 'KK123453'
      request(app)
        .put(`/api/users/${user._id}`)
        .set('x-access-token', token)
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username)
          //expect(res.body.password).to.equal('KK')
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/users/:userId', () => {
    it('should delete user', done => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username)
          //expect(res.body.password).to.equal('KK')
          done()
        })
        .catch(done)
    })
  })
})
