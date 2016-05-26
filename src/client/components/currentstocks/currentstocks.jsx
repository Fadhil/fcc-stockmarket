import React, { Component } from 'react';

class CurrentStocks extends Component {
  render() {
    const { currentStocks } = this.props;

    return (
      <div>
        <h2>Current Stocks</h2>
        {
          currentStocks.length > 0 ?
          currentStocks.map(s =>
            <div key={s.symbol}>
              {s.symbol} : {s.name}
            </div>
          ) :
          null
        }
      </div>
    );
  }
}

export default CurrentStocks;
