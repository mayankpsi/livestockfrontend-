import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapContentProvider } from "./context/MapPageContext";
import { CollarContextProvider } from "./context/CollarContext";
import { LivestockContextProvider } from "./context/LivestockContext";
import { ProfileContextProvider } from "./context/profileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AlertsContextProvider } from "./context/AlertsContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./assets/css/style.css";
import "./assets/css/header.css";
import "./index.css";
import App from "./App";

const labelFontSize = "1.5rem";
const theme = createTheme({
  palette: {
    primary: {
      main: "#B58B5D",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize,
        },
      },
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
              <AlertsContextProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Routes>
                    <Route path="/*" element={<App />} />
                  </Routes>
                </ThemeProvider>
              </AlertsContextProvider>
            </ProfileContextProvider>
          </LivestockContextProvider>
        </CollarContextProvider>
      </MapContentProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
