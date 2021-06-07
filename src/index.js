import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import App from './App';

import { SpeechProvider } from '@speechly/react-client';


ReactDOM.render(
  <SpeechProvider appId="41ab98a3-6d98-4812-b2ae-fa1f44cf83b1" language="en-US">
    <Provider store={store}>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root'),
);