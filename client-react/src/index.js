import * as React from "react";
import { render } from "react-dom";
//import { App } from "./app.js";
import App from "./app";
import store from "./store";
import { Provider } from "react-redux";

/* const root = ReactDOM.createRoot(document.getElementById("root")); */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
