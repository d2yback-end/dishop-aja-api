const mongoose = require('mongoose');
const app = require('./app');
const config = require('./configs/config');
const logger = require('./configs/logger');

let server;
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(process.env.PORT || config.port, () => {
    logger.info(`Server listening in http://localhost:${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
