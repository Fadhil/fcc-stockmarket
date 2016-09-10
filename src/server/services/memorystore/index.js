'use strict';
const hooks = require('./hooks');

class Service {
  constructor() {
    this.state = {};
    this.version = 0;
  }

  find(params) {
    return Promise.resolve(Object.assign({}, this.state));
  }

  patch(id, data) {
    const stock = Object.assign({}, {
      [id]: Object.assign({}, data, { data: data.data.slice() })
    });

    const updatedState = Object.assign({}, this.state, stock);

    this.state = updatedState;
    this.version += 1;

    return Promise.resolve(Object.assign({}, stock));
  }

  remove(id) {
    const updatedState = Object.assign({}, this.state);
    delete updatedState[id];

    this.state = updatedState;
    this.version += 1;

    return Promise.resolve(id);
  }
}

module.exports = function bootstrapMemoryStoreService() {
  const app = this;

  app.use('/memorystore', new Service());

  const memoryStoreService = app.service('/memorystore');

  memoryStoreService.before(hooks.before);
  memoryStoreService.after(hooks.after);
};
