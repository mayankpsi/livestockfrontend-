import { Routes, Route } from "react-router-dom";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./layout/Layout";
import {
  Collars,
  LivestockDetails,
  AdminDashBoard,
  AuthPage,
  Map,
  Livestocks,
  AlertsPage,
  ProfilePage,
  ViewCollarDetails,
  NotFound
} from "./pages";
import "./App.css";
import { CellWifiOutlined } from "@mui/icons-material";

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
// role - ceo, head, 
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AdminDashBoard />} />
          <Route path="map" element={<Map />} />
          <Route path="collars" element={<Collars />} />
          <Route path="collars/:id" element={<ViewCollarDetails />} />
          <Route path="livestocks" element={<Livestocks />} />
          <Route path="livestocks/:id" element={<LivestockDetails />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
