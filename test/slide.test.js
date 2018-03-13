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
    content: 'Fri 6 Apr 2016',
    fontColor: 'Green',
    fontSize: 'X-Small',
    fontWeight: 'Lighter',
    fontStyle: 'Normal'
  },
  time: {
    content: '01:01 AM',
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
    content: 'Fri 6 Apr 2016',
    fontColor: 'Green',
    fontSize: 'X-Small',
    fontWeight: 'Lighter',
    fontStyle: 'Normal'
  },
  time: {
    content: '01:01 AM',
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

describe('## Auth APIs', function () {
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
          for (var i = 0; i < 3; i++) {
            expect(slideTitles).to.deep.include(res.body[i].title)
          }
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

  describe('# GET /api/slides', () => {
    it('should return all slides', done => {
      request(app)
        .get(`/api/slides/${newId}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.title).to.deep.equal(samplePostSlide.title)
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
