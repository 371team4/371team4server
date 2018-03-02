const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../helpers/APIError')
const Schema = mongoose.Schema

/**
 * Define the Slide schema
 */
const UserSchema = new Schema({
  username: String,
  password: String
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get All User
   * @returns {Promise<allUser, APIError>}
   */
  get() {
    return this.find()
      .then(allUser => {
        if (allUser) {
          return allUser
        }
        const err = new APIError('No user exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },

  /**
   * Get Specific User
   * @returns {Promise<user, APIError>}
   */
  getById(id) {
    return this.findById(id)
      .then(user => {
        if (user) {
          return user
        }
        const err = new APIError('No user exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  }

}

module.exports = mongoose.model('User', UserSchema)
