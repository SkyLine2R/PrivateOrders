import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import store from "./Store/store";
/* const root = ReactDOM.createRoot(document.getElementById("root")); */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
