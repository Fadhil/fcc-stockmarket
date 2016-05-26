import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs';

import { getRandomHexColors } from '../../utilities/randomcolor';

class StockChart extends Component {
  constructor(props) {
    super(props);

    this.getChartConfig = this.getChartConfig.bind(this);
  }

  getChartConfig() {
    const { stocks } = this.props;

    const symbols = Object.keys(stocks);
    const hexColors = getRandomHexColors(symbols.length);
    const labels = stocks[symbols[0]].data.map(d => d[0]);
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
      <div>
        <h2>Stock Data for 2015 (monthly)</h2>

        {
          config !== null ?
            <LineChart data={config.data} options={config.options} redraw /> :
            null
        }
      </div>
    );
  }
}

export default StockChart;
