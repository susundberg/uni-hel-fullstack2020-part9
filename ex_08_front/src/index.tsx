import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { reducer, StateProvider } from "./state";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <StateProvider reducer={reducer}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StateProvider>,
  document.getElementById('root')
);
