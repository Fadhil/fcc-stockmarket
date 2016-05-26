import React, { Component } from 'react';

import Stock from './stock';

class CurrentStocks extends Component {
  render() {
    const { currentStocks, removeHandler } = this.props;

    return (
      <div className="currentstocks-container">
        <h3>Current Stocks</h3>

        <div className="currentstocks-list">
        {
          currentStocks.length > 0 ?
          currentStocks.map(s =>
            <Stock
              key={s.symbol}
              symbol={s.symbol}
              name={s.name}
              removeHandler={removeHandler}
            />
          ) :
          null
        }
        </div>
      </div>
    );
  }
}

export default CurrentStocks;
