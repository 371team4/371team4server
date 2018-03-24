const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../../helpers/APIError')
const Slide = require('../slide/slide.model')
const Schema = mongoose.Schema

/**
 * Define the Image schema
 */
const ImageSchema = new Schema({
  name: String,
  mimetype: String,
  md5: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// remove the references from the slides collection n..n relation
ImageSchema.pre('remove', function (next) {
  Slide.update(
    { images: this._id },
    { $pull: { images: this._id } },
    { multi: true },
    function (err) {
      /* istanbul ignore next: Cannot test error from cascade delete */
      if(err){
        throw new Error(err)
      }
    }
  ).exec()
  return next()
})

/**
 * Statics
 */
ImageSchema.statics = {
  /**
   * Get image
   * @param {ObjectId} id - The objectId of image.
   * @returns {Promise<Image, APIError>}
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then(image => {
        if (image) {
          return image
        }
        const err = new APIError('No such image exists!', httpStatus.NOT_FOUND, true)
        return Promise.reject(err)
      })
  },

  /**
   * List images in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of images to be skipped.
   * @param {number} limit - Limit number of images to be returned.
   * @returns {Promise<Image[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  }
}

module.exports = mongoose.model('Image', ImageSchema)
