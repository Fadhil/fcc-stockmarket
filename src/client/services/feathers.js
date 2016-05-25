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
    this.stateService.removeStock(d);
  });
};

FeathersService.prototype.getStock = function getStock(id) {
  return this.stockService.get(id)
    .then(result => this.stateService.setStock(result));
};

FeathersService.prototype.synchronize = function synchronize() {
  return this.stockService.find()
    .then(result => this.stateService.sync(result));
};

const service = new FeathersService();
service.initialize();
export default service;
