'use strict';
const quandl = require('./quandl');

module.exports = function() {
  const app = this;

  app.configure(quandl);
}
