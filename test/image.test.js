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

const nonExistingObjId = '5a98ad9a16608d51844ef439'

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

    it('should return subset of images when limit and skip params are present', done => {
      request(app)
        .get('/api/images')
        .query({ limit: 1, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should limit returned images to 50 images, when limit is above 50', done => {
      request(app)
        .get('/api/images')
        .query({ limit: 500, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(2)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should not skip any images when skip is negative', done => {
      request(app)
        .get('/api/images')
        .query({ limit: 1, skip: -20 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should return a single image when its id is provided', done => {
      request(app)
        .get(`/api/images/${initialImages[0]._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.md5).to.deep.equal(initialImages[0].md5)
          expect(res.body.mimetype).to.deep.equal(initialImages[0].mimetype)
          expect(res.body.name).to.deep.equal(initialImages[0].name)
          done()
        })
        .catch(done)
    })

    it('should return error when image is not present in the collection', done => {
      request(app)
        .get(`/api/images/${nonExistingObjId}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('No such image exists!')
          done()
        })
        .catch(done)
    })
  })

  describe('# PUT /api/images', () => {
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

    it('should not create a new image when it already exists in the collection', done => {
      request(app)
        .put('/api/images')
        .set('x-access-token', token)
        .attach('image', path.join(__dirname, './Image/001.jpg'))
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('001.jpg')
          expect(res.body._id).to.equal(newId)
          done()
        })
        .catch(done)
    })

    it('should not create an entry in the collection when no files are provided', done => {
      request(app)
        .put('/api/images')
        .set('x-access-token', token)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal('No files were provided to upload!')
          done()
        })
        .catch(done)
    })

    it('should not create an entry in the collection when no image is provided', done => {
      request(app)
        .put('/api/images')
        .set('x-access-token', token)
        .attach('', path.join(__dirname, './Image/001.jpg'))
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal('Upload name must be an image!')
          done()
        })
        .catch(done)
    })

    it('should not create an entry in the collection when uploaded image is not an image', done => {
      request(app)
        .put('/api/images')
        .set('x-access-token', token)
        .attach('image', path.join(__dirname, './Image/not.an.image.txt'))
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal('Upload file must be of type image!')
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
