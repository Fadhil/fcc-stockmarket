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
}

FeathersService.prototype.getStock = function getStock(id) {
  this.app.service('quandl').get(id)
    .then(r => console.log('getStock', r))
    .catch(e => console.log('getStock error', e));
};

const service = new FeathersService();
export default service;
