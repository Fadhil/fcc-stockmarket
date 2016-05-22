const path = require('path');
const feathers = require('feathers');
const serveStatic = require('feathers').static;
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const cors = require('cors');
const compress = require('compression');

const middleware = require('./middleware');

const app = feathers();

app.configure(configuration(path.join(__dirname)));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use('/', serveStatic(app.get('public')))
  .use(bodyParser.json())
  .configure(hooks())
  .configure(middleware);

module.exports = app;
