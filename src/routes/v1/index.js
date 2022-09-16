const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const cartRoute = require('./cart.route');
const orderRoute = require('./order.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/carts',
    route: cartRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
