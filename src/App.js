import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
// import logo from './logo.svg';
import "./App.css";

function App() {
  // all-routes
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (
        localStorage.getItem("liveStock_user") == route.name ||
        route.name == "auth"
      )
        return (
          <Route path={route.route} element={route.component} key={route.key} />
        );
    });

  return (
    <Routes>
      {getRoutes(routes())}
      <Route
        path="/*"
        element={<Navigate replace to="/authentication/sign-in" />}
      />
      {/* <Route
        path="/dashboard"
        element={<Navigate replace to="/user/dashboard" />}
      /> */}
    </Routes>
  );
}

export default App;
