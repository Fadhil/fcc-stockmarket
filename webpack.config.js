const helpers = require('./config/helpers');

if (helpers.isDevelopment) module.exports = require('./config/webpack.dev');
if (helpers.isTest) module.exports = require('./config/webpack.test');
if (helpers.isProduction) module.exports = require('./config/webpack.prod');
