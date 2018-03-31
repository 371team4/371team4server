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

const slideTitles = [
  {
    content: 'Third',
    fontColor: 'Blue',
    fontSize: 'X-Large',
    fontWeight: 'Normal',
    fontStyle: 'Italic'
  },
  {
    content: 'first',
    fontColor: 'Blue',
    fontSize: 'Small',
    fontWeight: 'Normal',
    fontStyle: 'Italic'
  },
  {
    content: 'Second',
    fontColor: 'Blue',
    fontSize: 'Smaller',
    fontWeight: 'Normal',
    fontStyle: 'Italic'
  }
]

let samplePostSlide = {
  title: {
    content: 'some',
    fontColor: 'Blue',
    fontSize: 'Small',
    fontWeight: 'Normal',
    fontStyle: 'Italic'
  },
  description: {
    content: 'some Slide',
    fontColor: 'Red',
    fontSize: 'Large',
    fontWeight: 'Bold',
    fontStyle: 'Oblique'
  },
  date: {
    content: '2016-04-06',
    fontColor: 'Green',
    fontSize: 'X-Small',
    fontWeight: 'Lighter',
    fontStyle: 'Normal'
  },
  time: {
    content: '2016-04-06 01:01',
    fontColor: 'Yellow',
    fontSize: 'XX-Small',
    fontWeight: 'Bolder',
    fontStyle: 'Normal'
  },
  meta: {
    template: 'DefaultSlideTemplate',
    timeout: '20',
    repeatable: true,
    startDate: '2017-02-16',
    endDate: '2018-03-05'
  },
  images: ['5a98ada216608d51864ef43c', '5a98ad9a16608d51864ef439', '5a98ad9a16608d51864ef43b']
}

let sampleUpdateSlide = {
  title: {
    content: 'someNew',
    fontColor: 'Blue',
    fontSize: 'Small',
    fontWeight: 'Normal',
    fontStyle: 'Italic'
  },
  description: {
    content: 'some Slide',
    fontColor: 'Red',
    fontSize: 'Large',
    fontWeight: 'Bold',
    fontStyle: 'Oblique'
  },
  date: {
    content: '2016-04-06',
    fontColor: 'Green',
    fontSize: 'X-Small',
    fontWeight: 'Lighter',
    fontStyle: 'Normal'
  },
  time: {
    content: '2016-04-06 01:01',
    fontColor: 'Yellow',
    fontSize: 'XX-Small',
    fontWeight: 'Bolder',
    fontStyle: 'Normal'
  },
  meta: {
    template: 'DefaultSlideTemplate',
    timeout: '20',
    repeatable: true,
    startDate: '2017-02-16',
    endDate: '2018-03-05'
  },
  images: ['5a98ada216608d51864ef43c', '5a98ad9a16608d51864ef439', '5a98ad9a16608d51864ef43b']
}

const nonExistingObjId = '5a98ad9a16608d51844ef439'

let sampleGetSlide

describe('## Slide APIs', function () {
  this.timeout(15000)
  before(done => {
    const mongoUri = config.mongoURI
    mongoose
      .connect(mongoUri, { keepAlive: 1 })
      .then(async () => {
        await seed.initImagesCollection()
        await seed.initSlidesCollection()
        await seed.initUsersCollection()
        // how should I call await and async here ?
        try {
          const res = await request(app).post('/api/login').send({ username: 'test', password: 'admin001' })
          if (res) {
            samplePostSlide.token = res.body.token
            sampleUpdateSlide.token = res.body.token
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

  describe('# GET /api/slides', () => {
    it('should return all slides', done => {
      request(app)
        .get('/api/slides')
        .expect(httpStatus.OK)
        .then(res => {
          sampleGetSlide = res.body[0]
          for (var i = 0; i < 3; i++) {
            expect(slideTitles).to.deep.include(res.body[i].title)
          }
          done()
        })
        .catch(done)
    })

    it('should return subset of slides when limit and skip params are present', done => {
      request(app)
        .get('/api/slides')
        .query({ limit: 1, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should limit returned slides to 50 slides, when limit is above 50', done => {
      request(app)
        .get('/api/slides')
        .query({ limit: 500, skip: 1 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(2)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should not skip any slides when skip is negative', done => {
      request(app)
        .get('/api/slides')
        .query({ limit: 1, skip: -20 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.lengthOf(1)
          expect(res.body[0]).to.have.any.key('_id')
          done()
        })
        .catch(done)
    })

    it('should return a single slide when its id is provided', done => {
      request(app)
        .get(`/api/slides/${sampleGetSlide._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.deep.equal(sampleGetSlide)
          done()
        })
        .catch(done)
    })

    it('should return error when slide is not present in the collection', done => {
      request(app)
        .get(`/api/slides/${nonExistingObjId}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('No such slide exists!')
          done()
        })
        .catch(done)
    })
  })

  describe('# POST /api/slides', () => {
    it('should create a new slide', done => {
      request(app)
        .post('/api/slides')
        .send(samplePostSlide)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.title).to.deep.equal(samplePostSlide.title)
          newId = res.body._id
          done()
        })
        .catch(done)
    })
  })

  describe('# PUT /api/slides/slideId', () => {
    it('should update a current slide', done => {
      request(app)
        .put(`/api/slides/${newId}`)
        .send(sampleUpdateSlide)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.title).to.deep.equal(sampleUpdateSlide.title)
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/slides/slideId', () => {
    it('should DELETE a current slide', done => {
      request(app)
        .delete(`/api/slides/${newId}`)
        .send(sampleUpdateSlide)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.title).to.deep.equal(sampleUpdateSlide.title)
          done()
        })
        .catch(done)
    })
  })
})
