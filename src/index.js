import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { LoaderControllerProvider } from "./context/common";
import { AddSiteControllerProvider } from "./context/addSite";
import { AddBmControllerProvider } from "./context/addBm";

import "./assets/css/style.css";
import "./assets/css/header.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderControllerProvider>
        <AddSiteControllerProvider>
          <AddBmControllerProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <App />
            </SnackbarProvider>
          </AddBmControllerProvider>
        </AddSiteControllerProvider>
      </LoaderControllerProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
