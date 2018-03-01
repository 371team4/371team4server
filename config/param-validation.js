const Joi = require("joi");

module.exports = {
  // POST /api/slides
  createSlide: {
    body: {
      title: {
        content: Joi.string()
          .required()
          .label("title.content"),
        fontColor: Joi.string()
          .required()
          .label("title.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("title.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("title.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("title.fontStyle")
      },
      description: {
        content: Joi.string()
          .required()
          .label("description.content"),
        fontColor: Joi.string()
          .required()
          .label("description.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("description.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("description.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("description.fontStyle")
      },
      date: {
        content: Joi.string()
          .required()
          .label("date.content"),
        fontColor: Joi.string()
          .required()
          .label("date.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("date.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("date.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("date.fontStyle")
      },
      time: {
        content: Joi.string()
          .required()
          .label("time.content"),
        fontColor: Joi.string()
          .required()
          .label("time.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("time.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("time.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("time.fontStyle")
      },
      meta: {
        template: Joi.string()
          .required()
          .label("meta.template"),
        timeout: Joi.string()
          .required()
          .label("meta.timeout"),
        repeatable: Joi.boolean()
          .required()
          .label("meta.repeatable"),
        startDate: Joi.string()
          .required()
          .label("meta.startDate"),
        endDate: Joi.string()
          .required()
          .label("meta.endDate")
      },
      images: Joi.array()
        .items({
          src: Joi.string()
            .required()
            .label("image.src")
        })
        .required()
    }
  },

  // UPDATE /api/slides/:slideId
  updateSlide: {
    body: {
      title: {
        content: Joi.string()
          .required()
          .label("title.content"),
        fontColor: Joi.string()
          .required()
          .label("title.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("title.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("title.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("title.fontStyle")
      },
      description: {
        content: Joi.string()
          .required()
          .label("description.content"),
        fontColor: Joi.string()
          .required()
          .label("description.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("description.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("description.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("description.fontStyle")
      },
      date: {
        content: Joi.string()
          .required()
          .label("date.content"),
        fontColor: Joi.string()
          .required()
          .label("date.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("date.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("date.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("date.fontStyle")
      },
      time: {
        content: Joi.string()
          .required()
          .label("time.content"),
        fontColor: Joi.string()
          .required()
          .label("time.fontColor"),
        fontSize: Joi.string()
          .required()
          .label("time.fontSize"),
        fontWeight: Joi.string()
          .required()
          .label("time.fontWeight"),
        fontStyle: Joi.string()
          .required()
          .label("time.fontStyle")
      },
      meta: {
        template: Joi.string()
          .required()
          .label("meta.template"),
        timeout: Joi.string()
          .required()
          .label("meta.timeout"),
        repeatable: Joi.boolean()
          .required()
          .label("meta.repeatable"),
        startDate: Joi.string()
          .required()
          .label("meta.startDate"),
        endDate: Joi.string()
          .required()
          .label("meta.endDate")
      },
      images: Joi.array()
        .items({
          src: Joi.string()
            .required()
            .label("image.src")
        })
        .required()
    },
    params: {
      slideId: Joi.string()
        .hex()
        .required()
    }
  }
};
