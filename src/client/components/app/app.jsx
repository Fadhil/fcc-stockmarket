import React, { Component } from 'react';

import Feathers from '../../services/feathers';

class App extends Component {

  componentDidMount() {
    Feathers.getStock('FB');
    Feathers.synchronize();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
