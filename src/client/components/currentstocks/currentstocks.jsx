import React, { Component } from 'react';

class CurrentStocks extends Component {
  render() {
    const { currentStocks, removeHandler } = this.props;

    return (
      <div>
        <h2>Current Stocks</h2>
        {
          currentStocks.length > 0 ?
          currentStocks.map(s =>
            <div key={s.symbol}>
              <div>
                {s.symbol} : {s.name}
                <button data-symbol={s.symbol} onClick={removeHandler}>Remove</button>
              </div>
            </div>
          ) :
          null
        }
      </div>
    );
  }
}

export default CurrentStocks;
