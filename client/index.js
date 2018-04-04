import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.scss';
import {Provider} from 'react-redux';
import store from './store';
import {Router} from 'react-router';
import history from './history';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
