'use strict';

const checkForStockBefore = (hook) => {
  const stockService = hook.app.service('stock');
  const stockId = hook.id;

  stockService.get(stockId)
    .then(stock => {
      const result = Object.assign({}, { dataset: stock.dataset });
      /* eslint-disable no-param-reassign */
      hook.result = result;
      /* eslint-enable no-param-reassign */
    })
    .catch(error => {
      if (error.code === 404) return;
      console.error('stockService.get error', error.code);
    });
};

const createStockAfter = hook => {
  const stockService = hook.app.service('stock');

  const result = Object.assign({}, JSON.parse(hook.result));

  stockService.create({
    id: result.dataset.dataset_code,
    dataset: result.dataset
  });
};

module.exports.before = {
  get: [checkForStockBefore]
};

module.exports.after = {
  get: [createStockAfter]
};
