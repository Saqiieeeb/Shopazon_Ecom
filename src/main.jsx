import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/Store";
import { BrowserRouter } from "react-router-dom";
import "./assets/fonts/amazonember/Amazon-Ember-Medium.ttf";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);
