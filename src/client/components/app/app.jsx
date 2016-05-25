import React, { Component } from 'react';

import Feathers from '../../services/feathers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: {}
    };
  }

  componentDidMount() {
    Feathers.synchronize()
      .then(() => this.setState({ stocks: Feathers.stateService.getState() }));
    // Feathers.getStock('FB')
      // .then(() => this.setState({ stocks: Feathers.stateService.getState() }));
  }

  render() {
    return (
      <div>
        <p>number of stocks: {Object.keys(this.state.stocks).length}</p>
      </div>
    );
  }
}

export default App;
