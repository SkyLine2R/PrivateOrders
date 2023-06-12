import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import App from "./app";
import store from "./Store/store";
import { AuthProvider } from "./Context/authProvider";

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app")
);
