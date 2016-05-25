'use strict';

const beforeGet = hook => {
  const stockService = hook.app.service('stock');
  const stockId = hook.id;

  if (stockService.state[stockId]) {
    /* eslint-disable no-param-reassign */
    hook.result = { [stockId]: stockService.state[stockId] };
    /* eslint-enable no-param-reassign */
  }
};

const afterGet = hook => {
  const stockService = hook.app.service('stock');
  const stockId = hook.id;

  if (stockService.state[stockId]) return;

  const parsed = JSON.parse(hook.result);

  const stock = Object.assign({}, {
    [parsed.dataset.dataset_code]: parsed.dataset
  });

  /* eslint-disable no-param-reassign */
  hook.result = stock;
  /* eslint-enable no-param-reassign */

  stockService.create(stock);
};

module.exports.before = {
  get: [beforeGet]
};

module.exports.after = {
  get: [afterGet]
};
