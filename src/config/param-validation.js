const Joi = require('joi')

// validation schema for title object and its contents
const titleValidationSchema = Joi.object().keys({
  content: Joi.string()
    .required()
    .label('title.content'),
  fontColor: Joi.string()
    .required()
    .label('title.fontColor'),
  fontSize: Joi.string()
    .required()
    .label('title.fontSize'),
  fontWeight: Joi.string()
    .required()
    .label('title.fontWeight'),
  fontStyle: Joi.string()
    .required()
    .label('title.fontStyle')
})

// validation schema for description object and its contents
const descriptionValidationSchema = Joi.object().keys({
  content: Joi.string()
    .required()
    .label('description.content'),
  fontColor: Joi.string()
    .required()
    .label('description.fontColor'),
  fontSize: Joi.string()
    .required()
    .label('description.fontSize'),
  fontWeight: Joi.string()
    .required()
    .label('description.fontWeight'),
  fontStyle: Joi.string()
    .required()
    .label('description.fontStyle')
})

// validation schema for date object and its contents
const dateValidationSchema = Joi.object().keys({
  content: Joi.string()
    .required()
    .label('date.content'),
  fontColor: Joi.string()
    .required()
    .label('date.fontColor'),
  fontSize: Joi.string()
    .required()
    .label('date.fontSize'),
  fontWeight: Joi.string()
    .required()
    .label('date.fontWeight'),
  fontStyle: Joi.string()
    .required()
    .label('date.fontStyle')
})

// validation schema for time object and its contents
const timeValidationSchema = Joi.object().keys({
  content: Joi.string()
    .required()
    .label('time.content'),
  fontColor: Joi.string()
    .required()
    .label('time.fontColor'),
  fontSize: Joi.string()
    .required()
    .label('time.fontSize'),
  fontWeight: Joi.string()
    .required()
    .label('time.fontWeight'),
  fontStyle: Joi.string()
    .required()
    .label('time.fontStyle')
})

// validation schema for meta object and its contents
const metaValidationSchema = Joi.object().keys({
  template: Joi.string()
    .required()
    .label('meta.template'),
  timeout: Joi.string()
    .required()
    .label('meta.timeout'),
  repeatable: Joi.boolean()
    .required()
    .label('meta.repeatable'),
  startDate: Joi.string()
    .required()
    .label('meta.startDate'),
  endDate: Joi.string()
    .required()
    .label('meta.endDate')
})

// validation schema for images array and its contents
const imagesValidationSchema = Joi.array()
  .items(
    Joi.string()
      .hex()
      .required()
      .label('image ids')
  )
  .required()

module.exports = {
  // POST /api/slides
  createSlide: {
    body: {
      title: titleValidationSchema,
      description: descriptionValidationSchema,
      date: dateValidationSchema,
      time: timeValidationSchema,
      meta: metaValidationSchema,
      images: imagesValidationSchema
    }
  },

  // UPDATE /api/slides/:slideId
  updateSlide: {
    body: {
      title: titleValidationSchema,
      description: descriptionValidationSchema,
      date: dateValidationSchema,
      time: timeValidationSchema,
      meta: metaValidationSchema,
      images: imagesValidationSchema
    },
    params: {
      slideId: Joi.string()
        .hex()
        .required()
    }
  },

  // PUT /api/images
  uploadImage: {
    files: {
      image: Joi.object().required()
    }
  },

  // DELETE /api/images/:imageId
  deleteImage: {
    imageId: Joi.string()
      .hex()
      .required()
  },

  // POST /api/user
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/user/:slideId
  updateUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  },

  // POST /api/user/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
}
