const logger = require('../utils/logger');

function errorHandler(error, req, res, next) {
  console.error(error.stack);
  logger.error(error.message);
  res.status(500).send("Internal Server Error");
}

module.exports = errorHandler;
