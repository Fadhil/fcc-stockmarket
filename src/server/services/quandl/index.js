'use strict';
const got = require('got');

const quandl = require('../../config/quandl');
const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  // find(params) {}

  get(id, params) {
    const url = `${quandl.rootUrl}/datasets/WIKI/${id}.json?api_key=${quandl.key}`;
    return got(url)
      .then(response => response.body)
      .catch(error => {
        console.error('quandl.get', error);
      });
  }

  // create(data, params) {}
  // update(id, data, params) {}
  // patch(id, data, params) {}
  // remove(id, params) {}
}

module.exports = function bootstrapQuandlService() {
  const app = this;

  app.use('/quandl', new Service());

  const quandlService = app.service('/quandl');

  quandlService.before(hooks.before);
  quandlService.after(hooks.after);
};

module.exports.Service = Service;
