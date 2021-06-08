import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import App from './App';

import { SpeechProvider } from '@speechly/react-client';

import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './Redux/store';
import './index.css';

ReactDOM.render(
  <SpeechProvider appId="41ab98a3-6d98-4812-b2ae-fa1f44cf83b1" language="en-US">
    <Provider store={store}>
     <PersistGate persistor={persistor}>
      <App />
     </PersistGate>
    </Provider>
  </SpeechProvider>,
  document.getElementById('root'),
);
// PersistGate :- 
//wrap your root component (Top level component) with PersistGate. 
//This delays the rendering of your app's UI until your persisted state
// has been retrieved and saved to redux.

