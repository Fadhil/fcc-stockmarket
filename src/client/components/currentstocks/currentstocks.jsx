import React, { Component } from 'react';

class CurrentStocks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stockSymbols } = this.props;

    return (
      <div>
        <h2>Current Stocks</h2>
        {
          stockSymbols.map(s =>
            <div key={s}>
              {s}
            </div>
          )
        }
      </div>
    );
  }
}

export default CurrentStocks;
