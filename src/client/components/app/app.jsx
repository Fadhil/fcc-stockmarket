import React, { Component } from 'react';

import Feathers from '../../services/feathers';

class App extends Component {

  componentDidMount() {
    Feathers.synchronize();
    Feathers.getStock('FB');
    Feathers.getStock('INTU');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
