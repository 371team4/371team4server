const request = require('supertest')
const httpStatus = require('http-status')
const chai = require('chai')
const { app } = require('../index')

const expect = chai.expect
chai.config.includeStack = true

describe('## Misc', () => {
  describe('# GET /api/health-check', () => {
    it('should return OK', done => {
      request(app)
        .get('/api/health-check')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.text).to.equal('OK')
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/404', () => {
    it('should return 404 status', done => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found')
          done()
        })
        .catch(done)
    })
  })

  describe('# Error Handling', () => {
    it('should handle mongoose CastError - Cast to ObjectId failed', done => {
      request(app)
        .get('/api/users/56z787zzz67fc')
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then(res => {
          expect(res.body.message).to.equal('Internal Server Error')
          done()
        })
        .catch(done)
    })

    it('should handle token error when no token is provided', done => {
      request(app)
        .get('/api/users/')
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('No token is present')
          done()
        })
        .catch(done)
    })

    it('should handle token error when token is provided but invalid', done => {
      request(app)
        .get('/api/users/')
        .set('x-access-token', 'something is not right here')
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('JsonWebTokenError')
          done()
        })
        .catch(done)
    })
  })
})
