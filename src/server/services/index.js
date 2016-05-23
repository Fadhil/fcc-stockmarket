const quandl = require('./quandl');
const stock = require('./stock');

module.exports = function bootstrapServices() {
  const app = this;

  app.configure(quandl);
  app.configure(stock);
};
