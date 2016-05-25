import React, { Component } from 'react';

class StockChart extends Component {
  constructor(props) {
    super(props);

    this.formatStockData = this.formatStockData.bind(this);
  }

  formatStockData() {
    const { stocks } = this.props;
  }

  render() {
    return (
      <div>
        stockchart.jsx
      </div>
    );
  }
}

export default StockChart;
