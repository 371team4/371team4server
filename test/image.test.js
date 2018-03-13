const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai')
const path = require('path')
const { app, server } = require('../index')
const config = require('../src/config/config')
const seed = require('../src/config/seed')

const expect = chai.expect
chai.config.includeStack = true
chai.config.truncateThreshold = 0

const initialImages = JSON.parse(JSON.stringify(seed.initialImages))

const imageIds = ['5a98ad9a16608d51864ef439', '5a98ada216608d51864ef43c', '5a98ad9a16608d51864ef43b']

let newId, token

describe('## Image APIs', function () {
  this.timeout(15000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initImagesCollection()
        try {
          const res = await request(app).post('/api/login').send({ username: 'test', password: 'admin001' })
          if (res) {
            token = res.body.token
            done()
          }
        } catch(e) {
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

  describe('# GET /api/images', () => {
    it('should return all images', done => {
      request(app)
        .get('/api/images')
        .expect(httpStatus.OK)
        .then(res => {
          for (var i = 0; i < 3; i++) {
            expect(imageIds).to.include(res.body[i]._id)
          }
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/images', () => {
    it('should create a new image', done => {
      request(app)
      .put('/api/images')
      .set('x-access-token', token)
        .attach('image', path.join(__dirname, './Image/001.jpg'))
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('001.jpg')
          newId = res.body._id
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/images/:imageId', () => {
    it('should return one images', done => {
      request(app)
        .get(`/api/images/${initialImages[0]._id}`)
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.md5).to.deep.equal(initialImages[0].md5)
          expect(res.body.mimetype).to.deep.equal(initialImages[0].mimetype)
          expect(res.body.name).to.deep.equal(initialImages[0].name)
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/images/:imageId', () => {
    it('should delete image', done => {
      request(app)
        .delete(`/api/images/${newId}`)
        .set('x-access-token', token)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('001.jpg')
          done()
        })
        .catch(done)
    })
  })
})
