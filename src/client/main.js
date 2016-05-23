import { AppContainer as HotContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import App from './components/app/app';

const rootElement = document.getElementById('root');

if (process.env.HMR === 'enabled') {
  render(
    <HotContainer>
      <App />
    </HotContainer>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./components/app/app', () => {
    const NextApp = require('./components/app/app').default;

    render(
      <HotContainer>
        <NextApp />
      </HotContainer>,
      rootElement
    );
  });
}

if (process.env.HMR !== 'enabled') {
  render(
    <App />,
    rootElement
  );
}
