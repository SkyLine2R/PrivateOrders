import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Provider } from "react-redux";
import App from "./app";
import store from "./Store/store";
import { AuthProvider } from "./Context/authProvider";

render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
