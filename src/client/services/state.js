import { Subject } from 'rxjs/Subject';

function StateService() {
  this.state = {};

  this.stateSource = new Subject();
  this.state$ = this.stateSource.asObservable();
}

StateService.prototype.reset = function reset() {
  const updatedState = {};
  this.state = updatedState;
  this.pushToStateStream(updatedState);
};

StateService.prototype.setStock = function setStock(d) {
  const stockId = Object.keys(d)[0];
  if (this.state[stockId]) return;

  const updatedState = Object.assign({}, this.state, d);
  this.state = updatedState;
  this.pushToStateStream(updatedState);
};

StateService.prototype.removeStock = function removeStock(d) {
  if (!this.state[d]) return;
  const updatedState = Object.assign({}, this.state);
  delete updatedState[d];
  this.state = updatedState;
  this.pushToStateStream(updatedState);
};

StateService.prototype.sync = function sync(s) {
  const updatedState = Object.assign({}, s);
  this.state = updatedState;
  this.pushToStateStream(updatedState);
};

StateService.prototype.getState = function getState() {
  return Object.assign({}, this.state);
};

StateService.prototype.pushToStateStream = function pushToStateStream(s) {
  this.stateSource.next(s);
};

const service = new StateService();
export default service;
