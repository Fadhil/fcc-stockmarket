'use strict';
const quandl = require('../../config/quandl');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {}

  get(id, params) {}
  create(data, params) {}
  update(id, data, params) {}
  patch(id, data, params) {}
  remove(id, params) {}
}

module.exports = function() {
  const app = this;

  app.use('/quandl', new Service());
}

module.exports.Service = Service;
