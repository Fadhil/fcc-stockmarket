import React, { Component } from 'react';

import Feathers from '../../services/feathers';
import AddStock from '../addstock/addstock';
import StockChart from '../stockchart/stockchart';
import CurrentStocks from '../currentstocks/currentstocks';

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

    this.handleAddStock = this.handleAddStock.bind(this);
  }

  componentDidMount() {
    // const { stocks } = this.state;
    Feathers.synchronize();
    /* Get Data For Development Purposes */
      // .then(() => {
        // if (Object.keys(stocks).length < 1) {
          // Feathers.getStock('FB');
          // Feathers.getStock('TOL');
        // }
      // });
  }

  componentWillUnmount() {
    this.stateSubscription.unsubscribe();
  }

  handleAddStock(s) {
    Feathers.getStock(s);
  }

  render() {
    const { stocks } = this.state;

    return (
      <div>
        <p>number of stocks: {Object.keys(stocks).length}</p>

        <AddStock handler={this.handleAddStock} />

        <StockChart stocks={stocks} />

        <CurrentStocks stockSymbols={Object.keys(stocks)} />
      </div>
    );
  }
}

export default App;
