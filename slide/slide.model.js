const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../helpers/APIError')
const Schema = mongoose.Schema

/**
 * Define the Slide schema
 */
const SlideSchema = new Schema({
  title: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  description: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  date: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  time: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  meta: {
    template: String,
    timeout: String,
    repeatable: Boolean,
    startDate: String,
    endDate: String
  },
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * // TODO: add a hook for post delete to remove
 *          images that are only in this slide
 * // END TODO
 */

/**
 * Statics
 */
SlideSchema.statics = {
  /**
   * Get slide
   * @param {ObjectId} id - The objectId of slide.
   * @returns {Promise<Slide, APIError>}
   */
  get (id) {
    return this.findById(id)
      .populate('images')
      .exec()
      .then(slide => {
        if (slide) {
          return slide
        }
        const err = new APIError('No such slide exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },

  /**
   * List slides in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of slides to be skipped.
   * @param {number} limit - Limit number of slides to be returned.
   * @returns {Promise<Slide[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('images')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  }
}

module.exports = mongoose.model('Slide', SlideSchema)
