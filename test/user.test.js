const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai')
const { app, server } = require('../index')
const config = require('../src/config/config')
const seed = require('../src/config/seed')

const expect = chai.expect
chai.config.includeStack = true

const nonExistingObjId = '5a98ad9a16608d51844ef439'

let token

let tokenStaff

function sortUsersByName (user1, user2) {
  var nameA = user1.username.toUpperCase(); // ignore upper and lowercase
  var nameB = user2.username.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}

describe('## User APIs', function () {
  this.timeout(17000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initUsersCollection()
        try {
          const res = await request(app)
            .post('/api/login')
            .send({ username: 'admin', password: 'admin001' })
          if (res) {
            token = res.body.token
            try {
              const res = await request(app)
                .post('/api/login')
                .send({ username: 'test', password: 'admin001' })
              if (res) {
                tokenStaff = res.body.token
                done()
              }
            } catch (e) {
              console.log(e)
              done()
            }
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
    email: 'email@email.com',
    role:'staff'
  }

  const noNameUser = {
    password: 'helloworld'
  }

  const noPasswordUser = {
    username: 'admin'
  }

  let sampleUser

  describe('# GET /api/users', () => {
    it('should return all users', done => {
      request(app)
        .get('/api/users')
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          sampleUser = res.body[0]
          // destructure the body object
          const users = res.body.map((user) => {
            return { username: user.username, password: user.password, email: user.email, role: user.role }
          })

          // sort both arrays to deep compare
          users.sort(sortUsersByName)
          seed.initialUsers.sort(sortUsersByName)
          expect(users).to.deep.equal(seed.initialUsers)
          done()
        })
        .catch(done)
    })

    it('should return subset of users when limit and skip params are present', done => {
      request(app)
        .get('/api/users')
        .set('x-access-token', token)
        .query({ limit: 1, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should limit returned users to 50 users, when limit is above 50', done => {
      request(app)
        .get('/api/users')
        .set('x-access-token', token)
        .query({ limit: 500, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(2)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should not skip any users when skip is negative', done => {
      request(app)
        .get('/api/users')
        .set('x-access-token', token)
        .query({ limit: 1, skip: -20 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should return a single user when its id is provided', done => {
      request(app)
        .get(`/api/users/${sampleUser._id}`)
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.deep.equal(sampleUser)
          done()
        })
        .catch(done)
    })

    it('should return error when user is not present in the collection', done => {
      request(app)
        .get(`/api/users/${nonExistingObjId}`)
        .set('x-access-token', token)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('No such user exists!')
          done()
        })
        .catch(done)
    })

    it('should return error when staff token is not allowed in user route', done => {
      request(app)
        .get(`/api/users`)
        .set('x-access-token', tokenStaff)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Staff is not allowed to change user data')
          done()
        })
        .catch(done)
    })

  })

  describe('# POST /api/users', () => {
    it('should create a new user when all parameters are present', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username)
          user._id = res.body._id
          done()
        })
        .catch(done)
    })

    it('should not create a new user when username has been used before', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(user)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal('Username is not unique')
          done()
        })
        .catch(done)
    })

    it('should not create a new user when username and email are missing', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(noNameUser)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal("'username' is required and 'email' is required and 'role' is required")
          done()
        })
        .catch(done)
    })

    it('should not create a new user when email and password are missing', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', token)
        .send(noPasswordUser)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal("'password' is required and 'email' is required and 'role' is required")
          done()
        })
        .catch(done)
    })

    it('should return error when staff token is not allowed in user route', done => {
      request(app)
        .post('/api/users')
        .set('x-access-token', tokenStaff)
        .send(user)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Staff is not allowed to change user data')
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
          done()
        })
        .catch(done)
    })

    it('should return error when staff token is not allowed in user route', done => {
      user.password = 'KK123453'
      request(app)
        .put(`/api/users/${user._id}`)
        .set('x-access-token', tokenStaff)
        .send(user)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Staff is not allowed to change user data')
          done()
        })
        .catch(done)
    })

  })

  describe('# DELETE /api/users/:userId', () => {

    it('should return error when staff token is not allowed in user route', done => {
      user.password = 'KK123453'
      request(app)
        .delete(`/api/users/${user._id}`)
        .set('x-access-token', tokenStaff)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Staff is not allowed to change user data')
          done()
        })
        .catch(done)
    })

    it('should delete user', done => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username)
          done()
        })
        .catch(done)
    })

  })
})
