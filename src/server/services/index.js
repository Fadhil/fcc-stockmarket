const stock = require('./stock');

module.exports = function bootstrapServices() {
  const app = this;

  app.configure(stock);
};
