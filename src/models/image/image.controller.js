const httpStatus = require('http-status')
const path = require('path')
const fs = require('file-system')
const APIError = require('../../helpers/APIError')
const Image = require('./image.model')

/**
 * Load image and append to req.
 */
function load (req, res, next, id) {
  Image.get(id)
    .then(image => {
      req.image = image // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get image
 * @returns {Image}
 */
function get (req, res) {
  return res.json(req.image)
}

/**
 * Upload new image
 * @returns {Image}
 */

function upload (req, res, next) {
  // check that we were called with an upload file
  if (!req.files) {
    const err = new APIError('No files were provided to upload!', httpStatus.BAD_REQUEST, true)
    return next(err)
  }
  // check that we have an object called image which has the file info
  if (!req.files.image) {
    const err = new APIError('Upload name must be an image!', httpStatus.BAD_REQUEST, true)
    return next(err)
  }

  if (req.files.image.mimetype.indexOf('image/') === -1) {
    const err = new APIError('Upload file must be of type image!', httpStatus.BAD_REQUEST, true)
    return next(err)
  }

  // check if we have an image in the collection with the same md5 hash
  Image.findOne({ md5: req.files.image.md5 })
    .exec()
    .then(dbImage => {
      // if we don't find the same image, then upload it
      if (!dbImage) {
        const image = new Image(prepImage(req.files.image))

        // the path to save the image
        const saveLocation = `/images/${image.name}`

        // read from the socket connection and write to the saveLocation
        req.files.image.mv(path.join(__dirname, saveLocation), function (err) {
          // if there is an error then return to the client
          /* istanbul ignore if: don't know how to cause an error here */
          if (err) {
            return next(err)
          }
          // otherwise save the image and return the result
          image.path = saveLocation
          image
            .save()
            .then(savedImage => res.json(savedImage))
            .catch(/* istanbul ignore next */ e => next(e))
        })
      } else {
        // we have found the image in our collection
        // prep the new image
        const imageObj = prepImage(req.files.image)
        imageObj.name = `${Date.now()}-${imageObj.name}`
        imageObj.path = `/images/${imageObj.name}`
        const dupImage = new Image(imageObj)

        // duplicate the current file
        fs
          .createReadStream(path.join(__dirname, dbImage.path))
          .pipe(fs.createWriteStream(path.join(__dirname, dupImage.path)))

        // save the duplicate and return it
        dupImage
          .save()
          .then(savedImage => res.json(savedImage))
          .catch(/* istanbul ignore next */ e => next(e))
      }
    })
}

/**
 * Get image list.
 * @property {number} req.query.skip - Number of images to be skipped.
 * @property {number} req.query.limit - Limit number of images to be returned.
 * @returns {Image[]}
 */
function list (req, res, next) {
  // extract the limit and skip from the query object,
  // if limit or object is not present then assign defaults
  const { limit = 50, skip = 0 } = req.query

  // limit the batch size to 50 objects
  // skip must be positive
  const safeLimit = limit > 50 ? 50 : limit
  const safeSkip = skip < 0 ? 0 : skip

  Image.list({ limit: safeLimit, skip: safeSkip })
    .then(images => res.json(images))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Delete image.
 * @returns {Image}
 */
function remove (req, res, next) {
  const image = req.image
  fs.unlink(path.join(__dirname, image.path), function () {
    image
      .remove()
      .then(deletedImage => res.json(deletedImage))
      .catch(/* istanbul ignore next */ e => next(e))
  })
}

/**
 * Helper function to create an image
 */
function prepImage (image) {
  return {
    name: image.name,
    mimetype: image.mimetype,
    md5: image.md5
  }
}

module.exports = { load, get, upload, list, remove }
