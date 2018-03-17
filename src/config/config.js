const Joi = require('joi')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config()

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  HTTP_PORT: Joi.number().default(8080),
  HTTPS_PORT: Joi.number().default(8443),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MONGOLAB_URI: Joi.string()
    .required()
    .description('MongoLab URI for the database')
})
  .unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  httpPort: envVars.HTTP_PORT,
  httpsPort: envVars.HTTPS_PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongoURI: envVars.MONGOLAB_URI
}

module.exports = config
