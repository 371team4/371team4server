const bcrypt = require('bcrypt')
const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../../helpers/APIError')
const Schema = mongoose.Schema

/**
 * Define the Slide schema
 */
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },

  /**
   * Get Specific User
   * @returns {Promise<user, APIError>}
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user
        }
        const err = new APIError('No user exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  }
}

UserSchema.pre('save', async function (next) {
  try {
    // this --> current user object
    var SALT_FACTOR = 13 // should take about one second per hash

    if (!this.isModified('password')) {
      return next()
    }

    this.password = await bcrypt.hash(this.password, SALT_FACTOR)
    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
