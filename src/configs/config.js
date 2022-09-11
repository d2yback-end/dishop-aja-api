const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(4000),
    MONGO_URI: Joi.string().required().description('Mongo DB url'),
    EMAIL_FROM: Joi.string().description(
      'the from field in the emails sent by the app',
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URI,
  },
  email: {
    from: envVars.EMAIL_FROM,
  },
};
