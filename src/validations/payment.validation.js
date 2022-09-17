const Joi = require('joi');

const paymentStripe = {
  body: Joi.object().keys({
    tokenId: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = {
  paymentStripe,
};
