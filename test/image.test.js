const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai') // eslint-disable-line import/newline-after-import
const expect = chai.expect
const Mock = require('mockjs')
const path = require('path')
const fs = require('file-system')
const { app, server } = require('../index')
const config = require('../config/config')
const seed = require('../config/seed')


chai.config.includeStack = true
chai.config.truncateThreshold = 0

const initialImages = [
  {
    _id: '5a98ad9a16608d51864ef439',
    name: 'glass.jpg',
    mimetype: 'image/png',
    md5: '1aff56d3ac29f45b6283917d3b5d3adb',
    path: '/images/glass.jpg'
  },
  {
    _id: '5a98ada216608d51864ef43c',
    name: 'google.jpg',
    mimetype: 'image/jpeg',
    md5: '7864df87770667b3d7e291a5f6642a14',
    path: '/images/google.jpg'
  },
  {
    _id: '5a98ad9a16608d51864ef43b',
    name: 'androidparty.jpg',
    mimetype: 'image/jpeg',
    md5: '5cc6106614b3d9a3feb886e0fee9c25e',
    path: '/images/androidparty.jpg'
  }
]

const imageIds = ['5a98ad9a16608d51864ef439','5a98ada216608d51864ef43c','5a98ad9a16608d51864ef43b']

var newId;

describe('## Image APIs', function () {
  this.timeout(15000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initImagesCollection()
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

  describe('# GET /api/images', () => {
    it('should return all images', (done) => {
      request(app)
        .get('/api/images')
        .expect(httpStatus.OK)
        .then((res) => {
          for(var i = 0;i < 3;i++){
            expect(imageIds).to.include(res.body[i]._id);
          }
          done()
        })
        .catch(done)
    });
  })

  describe('# POST /api/images', () => {
    it('should create a new image', (done) => {
      request(app)
        .put('/api/images')
        .attach('image',path.join(__dirname, './Image/001.jpg'))
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('001.jpg')
          newId = res.body._id
          done()
        })
        .catch(done)
    });
  })

  describe('# GET /api/images/:imageId', () => {
    it('should return one images', (done) => {
      request(app)
        .get(`/api/images/${initialImages[0]._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.md5).to.deep.equal(initialImages[0].md5)
          expect(res.body.mimetype).to.deep.equal(initialImages[0].mimetype)
          expect(res.body.name).to.deep.equal(initialImages[0].name)
          done()
        })
        .catch(done)
    });
  })

  describe('# DELETE /api/images/:userId', () => {
    it('should delete image', (done) => {
      request(app)
        .delete(`/api/images/${newId}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('001.jpg')
          done();
        })
        .catch(done)
    })
  })
})

