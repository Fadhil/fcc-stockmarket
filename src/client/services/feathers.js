const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const rootUrl = process.env.NODE_ENV === 'production' ?
  `${window.location.origin}` :
  'http://localhost:3030';

const socket = io(rootUrl);

function FeathersService() {
  this.app = feathers()
    .configure(socketio(socket))
    .configure(hooks());

  this.stockService = this.app.service('stock');
  this.quandlService = this.app.service('quandl');

  this.stockService.on('created', (d) => {
    console.log('created!', d);
  });

  this.stockService.on('updated', (d) => {
    console.log('updated!', d);
  });

  this.stockService.on('patched', (d) => {
    console.log('patched!', d);
  });

  this.stockService.on('removed', (d) => {
    console.log('removed!', d);
  });
}

FeathersService.prototype.getStock = function addStock(id) {
  this.quandlService.get(id)
    .then(r => console.log('getStock success', r !== undefined))
    .catch(e => console.log('getStock error', e));
};

FeathersService.prototype.synchronize = function synchronize() {
  this.stockService.find()
    .then(r => console.log('synchronize', r))
    .catch(e => console.error('synchronize error', e));
};

const service = new FeathersService();
export default service;
