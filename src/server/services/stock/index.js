'use strict';
const got = require('got');

const quandl = require('../../config/quandl');
const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};

    this.state = {};
  }

  // find(params) {}

  get(id) {
    const url = `${quandl.rootUrl}/datasets/WIKI/${id}.json`;

    // QUERY STRING:
    // collapse: 'monthly',
    // start_date: '2015-01-01',
    // end_date: '2016-01-01',
    // order: 'asc',
    // api_key: quandl.key
    return got(url, {
      json: true,
      query: {
        collapse: 'monthly',
        start_date: '2015-01-01',
        end_date: '2016-01-01',
        column_index: 4, // closing price only
        order: 'asc',
        api_key: quandl.key
      }
    })
      .then(response => {
        const original = Object.assign({}, response.body.dataset);

        const formatted = Object.assign({}, {
          symbol: original.dataset_code,
          name: original.name,
          startDate: original.start_date,
          endDate: original.end_date,
          data: original.data.map(d => Object.assign({}, {
            date: d[0],
            close: d[1]
          }))
        });

        return formatted;
      });
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
