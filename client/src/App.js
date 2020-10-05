import React from "react";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import Reducer from "./State";

import Routes from "./Router";

import "./App.css";

const store = createStore(
  Reducer,
  composeWithDevTools(
    applyMiddleware(
      thunk
      // socketMiddleware
    )
  )
);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
