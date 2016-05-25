function StateService() {
  this.state = {};
}

StateService.prototype.reset = function reset() { this.state = {}; };

StateService.prototype.setStock = function setStock(d) {
  const stockId = Object.keys(d)[0];
  if (this.state[stockId]) return;

  const updatedState = Object.assign({}, this.state, d);
  this.state = updatedState;
};

StateService.prototype.removeStock = function removeStock(d) {
  if (!this.state[d]) return;
  const updatedState = Object.assign({}, this.state);
  delete updatedState[d];
  this.state = updatedState;
};

StateService.prototype.sync = function sync(s) {
  this.state = Object.assign({}, s);
};

StateService.prototype.getState = function getState() {
  return Object.assign({}, this.state);
};

const service = new StateService();
export default service;
