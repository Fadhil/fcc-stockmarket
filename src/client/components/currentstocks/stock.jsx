import React from 'react';

const Stock = ({ symbol, name, removeHandler }) => (
  <div className="stock">
    <h4>{symbol}:</h4>
    <span>{name}</span>
    <button data-symbol={symbol} onClick={removeHandler}>X</button>
  </div>
);

export default Stock;
