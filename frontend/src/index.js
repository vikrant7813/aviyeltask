import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import Default from './layouts/Default.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter  basename={'/'}>
      <Switch>
        <Route path="/" component={Default} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
