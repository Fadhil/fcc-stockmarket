const stock = require('./stock');
const memoryStore = require('./memorystore');

module.exports = function bootstrapServices() {
  const app = this;

  app.configure(stock);
  app.configure(memoryStore);
};
