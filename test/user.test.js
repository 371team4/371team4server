const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../index');
const config = require('../config/config');
const seed = require('../config/seed');

chai.config.includeStack = true;


/**
 * root level hooks
 */
/*
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});



describe('## User APIs', () => {

  let user = {
    username: 'KK123',
    password: '1234567890'
  };

    // connect to mongo db
  const mongoUri = config.mongoURI
  mongoose.connect(mongoUri, { keepAlive: 1 }).then(
    () => {
      seed
        .initSlidesCollection()
        .then(seed.initImagesCollection().then(
            seed.initUsersCollection().then(

              describe('# POST /api/users', () => {
                it('should create a new user', (done) => {
                  request(app)
                    .post('/api/users')
                    .send(user)
                    .expect(httpStatus.OK)
                    .then((res) => {
                      expect(res.body.username).to.equal(user.username);
                      expect(res.body.password).to.equal(user.password);
                      user = res.body;
                      done();
                    })
                    .catch(done);
                });
              }),

              describe('# POST /api/users/:userId', () => {
                it('should update user details', (done) => {
                  user.username = 'KK';
                  request(app)
                    .post(`/api/users/${user._id}`)
                    .send(user)
                    .expect(httpStatus.OK)
                    .then((res) => {
                      expect(res.body.username).to.equal('KK');
                      expect(res.body.password).to.equal(user.password);
                      done();
                    })
                    .catch(done);
                });
              }),

              describe('# DELETE /api/users/', () => {
                it('should delete user', (done) => {
                  request(app)
                    .delete(`/api/users/${user._id}`)
                    .expect(httpStatus.OK)
                    .then((res) => {
                      expect(res.body.username).to.equal('KK');
                      expect(res.body.password).to.equal(user.password);
                      done();
                    })
                    .catch(done);
                });
              })
            )
          )
        )
        .then(console.log('Clean up and Init was completed!'))
    },
    err => {
      throw new Error(`unable to connect to database: ${mongoUri}`)
    }
  )


});
*/
