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
    this.handleRemoveStock = this.handleRemoveStock.bind(this);
  }

  componentDidMount() {
    Feathers.synchronize();
  }

  componentWillUnmount() {
    this.stateSubscription.unsubscribe();
  }

  handleAddStock(s) {
    Feathers.getStock(s);
  }

  handleRemoveStock(s) {
    console.log('#handleRemoveStock', s);
  }

  render() {
    const { stocks } = this.state;

    return (
      <div>
        <AddStock handler={this.handleAddStock} />

        <StockChart stocks={stocks} />

        <CurrentStocks
          currentStocks={
            Object.keys(stocks).length > 0 ?
              Object.keys(stocks).map(s => ({
                symbol: s,
                name: stocks[s].name
              })) :
              []
          }
        />
      </div>
    );
  }
}

export default App;
