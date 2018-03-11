const mongoose = require('mongoose')
const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai') // eslint-disable-line import/newline-after-import
const expect = chai.expect
const { app, server } = require('../index')
const config = require('../src/config/config')
const seed = require('../src/config/seed')

chai.config.includeStack = true
chai.config.truncateThreshold = 0

let newId

const initialSlides =
[
  {
    "title": {
      "content": "Third",
      "fontColor": "Blue",
      "fontSize": "X-Large",
      "fontWeight": "Normal",
      "fontStyle": "Italic"
    },
    "description": {
      "content": "third Slide",
      "fontColor": "Red",
      "fontSize": "Large",
      "fontWeight": "Bold",
      "fontStyle": "Oblique"
    },
    "date": {
      "content": "Fri 8 Apr 2017",
      "fontColor": "Green",
      "fontSize": "X-Small",
      "fontWeight": "Lighter",
      "fontStyle": "Normal"
    },
    "time": {
      "content": "23:05 AM",
      "fontColor": "Yellow",
      "fontSize": "XX-Small",
      "fontWeight": "Bolder",
      "fontStyle": "Normal"
    },
    "meta": {
      "template": "DefaultSlideTemplate",
      "timeout": "20",
      "repeatable": true,
      "startDate": "2018-02-16",
      "endDate": "2018-03-05"
    },
    images: [
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ada216608d51864ef43c",
        "name": "google.jpg",
        "mimetype": "image/jpeg",
        "md5": "7864df87770667b3d7e291a5f6642a14",
        "path": "/images/google.jpg",
        "__v": 0
      },
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ad9a16608d51864ef439",
        "name": "glass.jpg",
        "mimetype": "image/png",
        "md5": "1aff56d3ac29f45b6283917d3b5d3adb",
        "path": "/images/glass.jpg",
        "__v": 0
      },
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ad9a16608d51864ef43b",
        "name": "androidparty.jpg",
        "mimetype": "image/jpeg",
        "md5": "5cc6106614b3d9a3feb886e0fee9c25e",
        "path": "/images/androidparty.jpg",
        "__v": 0
      }
    ],
    "createdAt": "2018-03-08T21:15:16.876Z",
    "_id": "5aa1a7e451c654296c10e28c",
    "__v": 0
  },
  {
    "title": {
      "content": "Second",
      "fontColor": "Blue",
      "fontSize": "Smaller",
      "fontWeight": "Normal",
      "fontStyle": "Italic"
    },
    "description": {
      "content": "second Slide",
      "fontColor": "Red",
      "fontSize": "Medium",
      "fontWeight": "Bold",
      "fontStyle": "Oblique"
    },
    "date": {
      "content": "Mon 6 Mar 2016",
      "fontColor": "Green",
      "fontSize": "Larger",
      "fontWeight": "Lighter",
      "fontStyle": "Normal"
    },
    "time": {
      "content": "01:00 AM",
      "fontColor": "Yellow",
      "fontSize": "XX-Large",
      "fontWeight": "Bolder",
      "fontStyle": "Normal"
    },
    "meta": {
      "template": "DefaultSlideTemplate",
      "timeout": "20",
      "repeatable": true,
      "startDate": "2018-02-16",
      "endDate": "2018-03-05"
    },
    images: [
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ada216608d51864ef43c",
        "name": "google.jpg",
        "mimetype": "image/jpeg",
        "md5": "7864df87770667b3d7e291a5f6642a14",
        "path": "/images/google.jpg",
        "__v": 0
      },
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ad9a16608d51864ef439",
        "name": "glass.jpg",
        "mimetype": "image/png",
        "md5": "1aff56d3ac29f45b6283917d3b5d3adb",
        "path": "/images/glass.jpg",
        "__v": 0
      },
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ad9a16608d51864ef43b",
        "name": "androidparty.jpg",
        "mimetype": "image/jpeg",
        "md5": "5cc6106614b3d9a3feb886e0fee9c25e",
        "path": "/images/androidparty.jpg",
        "__v": 0
      }
    ],
    "createdAt": "2018-03-08T21:15:16.876Z",
    "_id": "5aa1a7e451c654296c10e28b",
    "__v": 0
  },
  {
    "title": {
      "content": "first",
      "fontColor": "Blue",
      "fontSize": "Small",
      "fontWeight": "Normal",
      "fontStyle": "Italic"
    },
    "description": {
      "content": "first Slide",
      "fontColor": "Red",
      "fontSize": "Large",
      "fontWeight": "Bold",
      "fontStyle": "Oblique"
    },
    "date": {
      "content": "Wed 5 Feb 2015",
      "fontColor": "Green",
      "fontSize": "X-Small",
      "fontWeight": "Lighter",
      "fontStyle": "Normal"
    },
    "time": {
      "content": "02:05 AM",
      "fontColor": "Yellow",
      "fontSize": "XX-Small",
      "fontWeight": "Bolder",
      "fontStyle": "Normal"
    },
    "meta": {
      "template": "DefaultSlideTemplate",
      "timeout": "20",
      "repeatable": true,
      "startDate": "2018-02-16",
      "endDate": "2018-03-05"
    },
    images: [
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ada216608d51864ef43c",
        "name": "google.jpg",
        "mimetype": "image/jpeg",
        "md5": "7864df87770667b3d7e291a5f6642a14",
        "path": "/images/google.jpg",
        "__v": 0
      },
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ad9a16608d51864ef439",
        "name": "glass.jpg",
        "mimetype": "image/png",
        "md5": "1aff56d3ac29f45b6283917d3b5d3adb",
        "path": "/images/glass.jpg",
        "__v": 0
      },
      {
        "createdAt": "2018-03-08T21:15:16.757Z",
        "_id": "5a98ad9a16608d51864ef43b",
        "name": "androidparty.jpg",
        "mimetype": "image/jpeg",
        "md5": "5cc6106614b3d9a3feb886e0fee9c25e",
        "path": "/images/androidparty.jpg",
        "__v": 0
      }
    ],
    "createdAt": "2018-03-08T21:15:16.876Z",
    "_id": "5aa1a7e451c654296c10e28a",
    "__v": 0
  }
]

const slideTitles = [
  {
    "content": "Third",
    "fontColor": "Blue",
    "fontSize": "X-Large",
    "fontWeight": "Normal",
    "fontStyle": "Italic"
  },
  {
    "content": "first",
    "fontColor": "Blue",
    "fontSize": "Small",
    "fontWeight": "Normal",
    "fontStyle": "Italic"
  },
  {
    "content": "Second",
    "fontColor": "Blue",
    "fontSize": "Smaller",
    "fontWeight": "Normal",
    "fontStyle": "Italic"
  }
]

let samplePostSlide ={
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

let sampleUpdateSlide ={
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
        request(app)
                .post('/api/login')
                .send({
                  username: 'test',
                  password: 'test'
                })
                .then((res) => {
                  samplePostSlide.token = res.body.token
                  sampleUpdateSlide.token = res.body.token
                    done()
                  })
                .catch(e => console.error(e))
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

  describe('# GET /api/slides', () => {
    it('should return all slides', (done) => {
      request(app)
        .get('/api/slides')
        .expect(httpStatus.OK)
        .then((res) => {
          for(var i = 0;i < 3;i++){
           expect(slideTitles).to.deep.include(res.body[i].title);
          }
          done()
        })
        .catch(done)
    });
  })

  describe('# POST /api/slides', () => {
    it('should create a new slide', (done) => {
      request(app)
        .post('/api/slides')
        .send( samplePostSlide)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.deep.equal(samplePostSlide.title)
          newId = res.body._id
          done()
        })
        .catch(done)
    });
  })

  describe('# GET /api/slides', () => {
    it('should return all slides', (done) => {
      request(app)
        .get(`/api/slides/${newId}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.deep.equal(samplePostSlide.title)
          done()
        })
        .catch(done)
    });
  })

  describe('# PUT /api/slides/slideId', () => {
    it('should update a current slide', (done) => {
      request(app)
        .put(`/api/slides/${newId}`)
        .send(sampleUpdateSlide)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.deep.equal(sampleUpdateSlide.title)
          done()
        })
        .catch(done)
    });
  })

  describe('# DELETE /api/slides/slideId', () => {
    it('should DELETE a current slide', (done) => {
      request(app)
        .delete(`/api/slides/${newId}`)
        .send(sampleUpdateSlide)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.deep.equal(sampleUpdateSlide.title)
          done()
        })
        .catch(done)
    });
  })


})

