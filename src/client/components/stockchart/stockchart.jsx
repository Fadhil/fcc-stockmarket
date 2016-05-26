import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs';

import { getRandomHexColors } from '../../utilities/randomcolor';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

class StockChart extends Component {
  constructor(props) {
    super(props);

    this.getChartConfig = this.getChartConfig.bind(this);
  }

  getChartConfig() {
    const { stocks } = this.props;

    const symbols = Object.keys(stocks);
    const hexColors = getRandomHexColors(symbols.length);
    // const labels = stocks[symbols[0]].data.map(d => d[0]);
    const labels = months.slice(0);
    const datasets = symbols.map((s, i) => {
      const data = stocks[s].data.map(d => d[4]);
      return Object.assign({}, {
        label: s,
        fillColor: 'rgba(0, 0, 0, 0)',
        strokeColor: hexColors[i],
        pointColor: hexColors[i],
        data
      });
    });

    return {
      data: {
        labels,
        datasets
      },
      options: {
        pointDot: false,
        responsive: true
      }
    };
  }

  render() {
    const config = Object.keys(this.props.stocks).length > 0 ?
      this.getChartConfig() :
      null;

    return (
      <div className="stockchart-container">
        <h2>2015 Stock Data</h2>

        <div>
          {
            config !== null ?
              <LineChart data={config.data} options={config.options} redraw /> :
              null
          }
        </div>
      </div>
    );
  }
}

export default StockChart;
