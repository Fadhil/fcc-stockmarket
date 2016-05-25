import React, { Component } from 'react';

import Feathers from '../../services/feathers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: {}
    };

    this.stateSubscription = Feathers.stateService.state$.subscribe(
      (s) => {
        const updatedStocks = Object.assign({}, this.state.stocks, s);
        console.log('updatedStocks', updatedStocks);

        const updatedState = Object.assign({}, this.state, { stocks: updatedStocks });

        this.setState(updatedState);
      }
    );
  }

  componentDidMount() {
    const { stocks } = this.state;
    Feathers.synchronize()
    /* Get Data For Development Purposes */
      .then(() => {
        if (Object.keys(stocks).length < 1) {
          Feathers.getStock('FB');
          Feathers.getStock('TOL');
        }
      });
  }

  componentWillUnmount() {
    this.stateSubscription.unsubscribe();
  }

  render() {
    const { stocks } = this.state;

    return (
      <div>
        <p>number of stocks: {Object.keys(stocks).length}</p>
      </div>
    );
  }
}

export default App;
