'use strict';
const got = require('got');

const quandl = require('../../config/quandl');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  // find(params) {}

  get(id, params) {
    const url = `${quandl.rootUrl}/datasets/WIKI/${id}.json?api_key${quandl.key}`;

    return got(url)
      .then(response => response.body);
  }

  // create(data, params) {}
  // update(id, data, params) {}
  // patch(id, data, params) {}
  // remove(id, params) {}
}

module.exports = function bootstrapQuandlService() {
  const app = this;

  app.use('/quandl', new Service());
};

module.exports.Service = Service;
