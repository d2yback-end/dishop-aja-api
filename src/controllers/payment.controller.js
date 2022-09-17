const KEY = process.env.STRIPE_KEY;
const stripe = require('stripe')(KEY);
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const paymenStripe = catchAsync(async (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd',
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, stripeErr);
        } else {
          res.status(200).send(stripeRes);
        }
      },
    );
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  paymenStripe,
};
