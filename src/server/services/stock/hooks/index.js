'use strict';
const patchMemoryStore = hook => {
  const memoryStore = hook.app.service('/memorystore');

  memoryStore.patch(hook.result.symbol, Object.assign({}, hook.result));
};

module.exports.before = {};

module.exports.after = {
  get: [patchMemoryStore]
};
