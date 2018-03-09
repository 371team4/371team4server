const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai') // eslint-disable-line import/newline-after-import
const expect = chai.expect
const { app, server } = require('../index')
const config = require('../config/config')
const seed = require('../config/seed')

chai.config.includeStack = true
chai.config.truncateThreshold = 0

const initialImages = [
  {
    _id: '5a98ad9a16608d51864ef43b',
    name: 'androidparty.jpg',
    mimetype: 'image/jpeg',
    md5: '5cc6106614b3d9a3feb886e0fee9c25e',
    path: '/images/androidparty.jpg'
  },
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
  }
]

describe('## Auth APIs', () => {
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
    it('should return all slides', (done) => {
      request(app)
        .get('/api/images')
        .expect(httpStatus.OK)
        .then((res) => {
          for(var i = 0;i < 3;i++){
            expect(res.body[i].md5).to.deep.equal(initialImages[i].md5)
            expect(res.body[i].mimetype).to.deep.equal(initialImages[i].mimetype)
            expect(res.body[i].name).to.deep.equal(initialImages[i].name)
            expect(res.body[i].path).to.deep.equal(initialImages[i].path)
            expect(res.body[i]._v).to.deep.equal(initialImages[i]._v)
          }
          done()
          done()
        })
        .catch(done)
    });
  })
/*
  describe('# POST /api/slides', () => {
    it('should create a new slide', (done) => {
      request(app)
        .post('/api/slides')
        .send({
          token : token,
          slide : samplePostSlide
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.deep.equal(samplePostSlide.title)
          expect(res.body.description).to.deep.equal(samplePostSlide.description)
          expect(res.body.date).to.deep.equal(samplePostSlide.date)
          expect(res.body.time).to.deep.equal(samplePostSlide.time)
          expect(res.body.meta).to.deep.equal(samplePostSlide.meta)
          for(var i = 0; i < 3 ; i++){
            expect(res.body.images[i]._id).to.equal(samplePostSlide.images[i]._id)
          }
          done()
        })
        .catch(done)
    });
  })
*/
  /*
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

  */

})

