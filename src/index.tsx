import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, teamsTheme } from '@fluentui/react-northstar';

import * as serviceWorker from './serviceWorker';

import App from 'components/app';
import { AppContextProvider } from 'app-context';

ReactDOM.render(
  <AppContextProvider>
    <Provider theme={teamsTheme}>
      <App />
    </Provider>
  </AppContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
