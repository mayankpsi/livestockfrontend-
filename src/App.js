import { Routes, Route, useNavigate } from "react-router-dom";
import RequireAuth from "./utils/RequireAuth";
import AdminAccess from "./utils/AdminAccess";

import Layout from "./layout/Layout";
import {
  Collars,
  LivestockDetails,
  UserDashboard,
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
  LivestockHistoryPDF,
} from "./pages";
import "./App.css";
import UserManagement from "./Role/Admin/UserManagemnet";
import ViewUserDetails from "./Role/Admin/UserManagemnet/ViewUsers";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AuthPage />} />
        <Route
          path="getLivestockHistory/:id"
          element={<LivestockHistoryPDF />}
        />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<UserDashboard />} />
          <Route element={<AdminAccess />}>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/:id" element={<ViewUserDetails />} />
          </Route>
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
