import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "https://naeem-react-form.herokuapp.com";

// axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
