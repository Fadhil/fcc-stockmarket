'use strict';
const got = require('got');

const quandl = require('../../config/quandl');
const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};

    this.state = {};
  }

  find() {
    return Promise.resolve(this.state);
  }

  get(id) {
    const url = `${quandl.rootUrl}/datasets/WIKI/${id}.json`;
    const collapse = 'collapse=monthly';
    const date = 'start_date=2015-01-01&end_date=2016-01-01';
    const target = `${url}?${collapse}&${date}&order=asc&api_key=${quandl.key}`;
    return got(target)
      .then(response => response.body);
  }

  create(data) {
    const stock = Object.assign({}, data);
    const updatedState = Object.assign({}, this.state, stock);
    this.state = updatedState;
    return Promise.resolve(stock);
  }

  remove(id) {
    delete this.state[id];
    return Promise.resolve(id);
  }
}

module.exports = function bootstrapStockService() {
  const app = this;

  app.use('/stock', new Service());

  const stockService = app.service('/stock');

  stockService.before(hooks.before);
  stockService.after(hooks.after);
};

module.exports.Service = Service;
