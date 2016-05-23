import React, { Component } from 'react';

import Feathers from '../../services/feathers';

class App extends Component {

  componentDidMount() {
    Feathers.getStock('FB');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
