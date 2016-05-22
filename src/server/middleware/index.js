const logger = require('./logger');
const handler = require('feathers-errors/handler');
const notFound = require('./notfoundhandler');

module.exports = function() {
  const app = this;

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
