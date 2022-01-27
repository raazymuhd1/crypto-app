import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// react-router-dom
import { BrowserRouter as Router } from "react-router-dom"

// redux
import store from "./app/store"
import { Provider } from "react-redux"

// ant-design
import 'antd/dist/antd.css'

ReactDOM.render(
  <Router>
      <Provider store={store}>
              <App />
      </Provider>
      </Router>,
  document.getElementById('root')
);
