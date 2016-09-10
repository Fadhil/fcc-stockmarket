require('core-js'); // polyfills
global.sinon = require('sinon'); // expose sinon globally (window)

const context = require.context('../src/client', true, /\.spec\.js$/);

function requireAll(ctx) {
  return ctx.keys().map(ctx);
}

requireAll(context);
