const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai')
const { app, server } = require('../index')
const config = require('../src/config/config')
const seed = require('../src/config/seed')

const expect = chai.expect
chai.config.includeStack = true
chai.config.truncateThreshold = 0

let newId

const sampleWeek = {
  days: [
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Monday'
    },
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Tuesday'
    },
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Wednesday'
    },
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Thursday'
    },
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Friday'
    },
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Saturday'
    },
    {
      meals: {
        lunch: ['asdfasdfasdf', 'asdfsdaf'],
        supper: ['asdfasdf']
      },
      name: 'Sunday'
    }
  ],
  startDate: '2012-04-23T18:25:43.511Z'
}

const nonExistingObjId = '5a98ad9a16608d51844ef439'

let sampleUpdateWeek
let token
describe('## Week APIs', function () {
  this.timeout(15000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initWeeksCollection()
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

  describe('# GET /api/weeks', () => {
    it('should return all weeks', done => {
      request(app)
        .get('/api/weeks')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(seed.initialWeeks.length)
          done()
        })
        .catch(done)
    })

    it('should return subset of weeks when limit and skip params are present', done => {
      request(app)
        .get('/api/weeks')
        .query({ limit: 1, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should limit returned weeks to 50 weeks, when limit is above 50', done => {
      request(app)
        .get('/api/weeks')
        .query({ limit: 500, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should not skip any weeks when skip is negative', done => {
      request(app)
        .get('/api/weeks')
        .query({ limit: 1, skip: -20 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should return a single week when its id is provided', done => {
      request(app)
        .get(`/api/weeks/${seed.initialWeeks[0]._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body._id).to.equal(seed.initialWeeks[0]._id)
          done()
        })
        .catch(done)
    })

    it('should return error when week is not present in the collection', done => {
      request(app)
        .get(`/api/weeks/${nonExistingObjId}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('No such week exists!')
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/weeks', () => {
    it('should create a new week', done => {
      request(app)
        .post('/api/weeks')
        .set('x-access-token', token)
        .send(sampleWeek)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.startDate).to.deep.equal(sampleWeek.startDate)
          sampleUpdateWeek = res.body
          newId = res.body._id
          done()
        })
        .catch(done)
    })
  })

  describe('# PUT /api/weeks/weekId', () => {
    it('should update a current week', done => {
      sampleUpdateWeek.startDate = '2012-04-23T18:25:43.511Z'
      request(app)
        .put(`/api/weeks/${newId}`)
        .set('x-access-token', token)
        .send(sampleUpdateWeek)
        .expect(httpStatus.OK)
        .then(res => {
          res.body.__v = sampleUpdateWeek.__v
          expect(res.body).to.deep.equal(sampleUpdateWeek)
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/weeks/weekId', () => {
    it('should DELETE a current week', done => {
      request(app)
        .delete(`/api/weeks/${newId}`)
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          res.body.__v = sampleUpdateWeek.__v
          expect(res.body).to.deep.equal(sampleUpdateWeek)
          done()
        })
        .catch(done)
    })
  })
})
