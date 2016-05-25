const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

import StateService from './state';

const rootUrl = process.env.NODE_ENV === 'production' ?
  `${window.location.origin}` :
  'http://localhost:3030';

const socket = io(rootUrl);

function FeathersService() {
  this.app = feathers()
    .configure(socketio(socket))
    .configure(hooks());

  this.stateService = StateService;

  this.stockService = this.app.service('stock');
}

FeathersService.prototype.initialize = function initialize() {
  this.stockService.on('created', (d) => {
    this.stateService.setStock(d);
  });

  this.stockService.on('removed', (d) => {
    console.log('removed!', d);
  });
};

FeathersService.prototype.getStock = function getStock(id) {
  this.stockService.get(id)
    .then(r => console.log('getStock success', r))
    .catch(e => console.error('getStock', e));
};

FeathersService.prototype.synchronize = function synchronize() {
  this.stockService.find()
    .then(result => this.stateService.sync(result))
    .catch(e => console.error('synchronize error', e));
};

const service = new FeathersService();
// service.initialize.bind(service)();
service.initialize();
export default service;
