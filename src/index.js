import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapContentProvider } from "./context/MapPageContext";
import { CollarContextProvider } from "./context/CollarContext";
import { LivestockContextProvider } from "./context/LivestockContext";
import { ProfileContextProvider } from "./context/profileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./assets/css/style.css";
import "./assets/css/header.css";
import "./index.css";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B58B5D",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <AuthContextProvider>
      <MapContentProvider>
        <CollarContextProvider>
          <LivestockContextProvider>
            <ProfileContextProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </ThemeProvider>
            </ProfileContextProvider>
          </LivestockContextProvider>
        </CollarContextProvider>
      </MapContentProvider>
      </AuthContextProvider>
  </BrowserRouter>
);
