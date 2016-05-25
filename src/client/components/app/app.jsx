import React, { Component } from 'react';

import Feathers from '../../services/feathers';
import StockChart from '../stockchart/stockchart';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: {}
    };

    this.stateSubscription = Feathers.stateService.state$.subscribe(
      (s) => {
        const stocks = Object.assign({}, this.state.stocks, s);
        const updatedState = Object.assign({}, this.state, { stocks });
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

        <StockChart stocks={stocks} />
      </div>
    );
  }
}

export default App;
