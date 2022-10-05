import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const root = document.getElementById('root');

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
render(
  <Provider store={store}>
    <AlertProvider template = {AlertTemplate} {...options }>
      <App />
    </AlertProvider>
  </Provider>,
  root
);

