import { Routes, Route, useNavigate } from "react-router-dom";
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
  ViewPedometerDetails,
  NotFound,
  Devices,
  Notifications,
} from "./pages";
import "./App.css";
import { useEffect } from "react";

function App() {
  // const navigate = useNavigate();
  // const user = window.localStorage.getItem("userData");

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AdminDashBoard />} />
          <Route path="map" element={<Map />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="devices/collar/:id" element={<ViewCollarDetails />} />
          <Route
            path="devices/pedometer/:id"
            element={<ViewPedometerDetails />}
          />
          <Route path="livestocks" element={<Livestocks />} />
          <Route path="livestocks/:id" element={<LivestockDetails />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
