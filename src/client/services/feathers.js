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
  this.serverStore = this.app.service('memorystore');
}

FeathersService.prototype.initialize = function initialize() {
  // this.stockService.on('created', (d) => {
    // this.stateService.setStock(d);
  // });

  // this.stockService.on('removed', (d) => {
    // this.stateService.removeStock(d);
  // });

  this.serverStore.on('patched', (d) => {
    this.stateService.setStock(d);
  });

  this.serverStore.on('removed', (d) => {
    this.stateService.removeStock(d);
  });
};

FeathersService.prototype.getStock = function getStock(id) {
  return this.stockService.get(id);
    // .then(result => this.stateService.setStock(result));
};

FeathersService.prototype.removeStock = function removeStock(id) {
  return this.serverStore.remove(id);
    // .then(result => this.stateService.removeStock(result));
};

FeathersService.prototype.synchronize = function synchronize() {
  return this.serverStore.find()
    .then(result => this.stateService.sync(result));
};

const service = new FeathersService();
service.initialize();
export default service;
