const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../../helpers/APIError')
const Schema = mongoose.Schema

/**
 * Define the Slide schema
 */
const WeekSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  days: [{
    name: String,
    meals: {
      lunch: [String],
      supper: [String]
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Statics
 */
WeekSchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of weeks to be skipped.
   * @param {number} limit - Limit number of weeks to be returned.
   * @returns {Promise<Week[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },

  /**
   * Get Specific Week
   * @returns {Promise<Week, APIError>}
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then(week => {
        if (week) {
          return week
        }
        const err = new APIError('No such week exists!', httpStatus.NOT_FOUND, true)
        return Promise.reject(err)
      })
  }
}

module.exports = mongoose.model('Week', WeekSchema)
