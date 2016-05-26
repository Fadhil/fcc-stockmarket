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
        const updatedStocks = Object.assign({}, s);
        const updatedState = Object.assign({}, this.state, { stocks: updatedStocks });
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

  handleRemoveStock(e) {
    const { target: { dataset: { symbol } } } = e;
    Feathers.removeStock(symbol);
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
          removeHandler={this.handleRemoveStock}
        />
      </div>
    );
  }
}

export default App;
