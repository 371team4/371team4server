const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const { app, server } = require('../index')
const config = require('../config/config');
const seed = require('../config/seed');

chai.config.includeStack = true;

describe('## User APIs', function () {
  this.timeout(15000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initUsersCollection()
        done()
      })
      .catch(e => console.error(e))
  })

  after(done => {
    // may need to enable these once mocha watch is working
    //mongoose.models = {}
    //mongoose.modelSchemas = {}
    //mongoose.connection.close()
    server.close()
    done()
  })

  let user = {
    username: 'KK123',
    password: '1234567890'
  }

  let noNameUser = {
    password : 'helloworld'
  }

  let noPasswordUser = {
    username : 'admin'
  }

  describe('# POST /api/user', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username)
          expect(res.body.password).to.equal(user.password)
          user = res.body
          done()
        })
        .catch(done)
    });
  })

  describe('# POST /api/user', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(noNameUser)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('\'username\' is required')
          done()
        })
        .catch(done)
    });
  })

  describe('# POST /api/user', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/user')
        .send(noPasswordUser)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('\'password\' is required')
          done()
        })
        .catch(done)
    });
  })

  describe('# PUT /api/user/:userId', () => {
    it('should update user details', (done) => {
      user.password = 'KK'
      request(app)
        .put(`/api/user/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username)
          expect(res.body.password).to.equal('KK')
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/user/:userId', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/user/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username)
          expect(res.body.password).to.equal('KK')
          done();
        })
        .catch(done)
    })
  })

})

