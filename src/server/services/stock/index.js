'use strict';
const memory = require('feathers-memory');

module.exports = function bootstrapStockService() {
  const app = this;

  app.use('/stock', memory());
};
