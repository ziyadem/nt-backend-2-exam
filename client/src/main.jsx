import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//Route
import { BrowserRouter as Routes } from "react-router-dom";
//style
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Routes>
    <App />
    <ToastContainer theme="colored" />
  </Routes>
);
