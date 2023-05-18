import Auth from "./pages/auth/index";

// admin

import AdminDashboard from "./pages/admin";
import AdminSiteManagement from "./pages/admin/siteManagement";
import AdminAddSiteManagement from "./pages/admin/addSites";
import AdminGatewayManagement from "./pages/admin/siteManagement/gatewayDetail/index";
import AdminShowBranchManager from "./pages/admin/siteManagement/showBranchManager/index";
import AdminAddBranchManager from "./pages/admin/siteManagement/addBranchManager/index";
import AdminShowDevice from "./pages/admin/siteManagement/device/index";
import AdminUserManagementDashboard from "./pages/admin/userManagement";
import AdminUserManagement from "./pages/admin/userManagement/clientOverView/index";
import AdminLiveStocks from "./pages/admin/liveStockManagement/index";
import AdminLiveStocksOverview from "./pages/admin/liveStockManagement/livestockOverview/index";
// user
import UserDashboard from "./pages/user";
import SiteManagement from "./pages/user/siteManagement";
import GatewayManagement from "./pages/user/gatewayDetail/index";
import BranchManager from "./pages/user/branchManager";
import Device from "./pages/user/device";
import Setting from "./pages/user/settings";

import SuccessDialog from "./components/SuccessDialog";

export default function () {
  const routes = [
    {
      name: "auth",
      key: "/authentication/sign-in",
      route: "/authentication/sign-in",
      component: <Auth page="sign-in" />,
    },
    {
      name: "auth",
      key: "/authentication/sign-up",
      route: "/authentication/sign-up",
      component: <Auth page="sign-up" />,
    },
    {
      name: "auth",
      key: "/authentication/forgot-password",
      route: "/authentication/forgot-password",
      component: <Auth page="forgot-password" />,
    },
    // admin
    {
      name: "admin",
      key: "/admin/success",
      route: "/admin/success",
      component: <SuccessDialog />,
    },
    {
      name: "admin",
      key: "/admin/dashboard",
      route: "/admin/dashboard",
      component: <AdminDashboard />,
    },
    {
      name: "admin",
      key: "/admin/site-management",
      route: "/admin/site-management",
      component: <AdminSiteManagement />,
    },
    ,
    {
      name: "admin",
      key: "/admin/site-management/add-site-management",
      route: "/admin/site-management/add-site-management",
      component: <AdminAddSiteManagement />,
    },
    {
      name: "admin",
      key: "/admin/site-management/:gatewayName",
      route: "/admin/site-management/:gatewayName",
      component: <AdminGatewayManagement />,
    },
    {
      name: "admin",
      key: "/admin/site-management/:gatewayName/:branchName",
      route: "/admin/site-management/:gatewayName/:branchName",
      component: <AdminShowBranchManager />,
    },
    {
      name: "admin",
      key: "/admin/site-management/:gatewayName/add-branch-manager",
      route: "/admin/site-management/:gatewayName/add-branch-manager",
      component: <AdminAddBranchManager />,
    },
    {
      name: "admin",
      key: "/admin/site-management/:gatewayName/:branchName/:deviceId",
      route: "/admin/site-management/:gatewayName/:branchName/:deviceId",
      component: <AdminShowDevice />,
    },
    {
      name: "admin",
      key: "/admin/user-management",
      route: "/admin/user-management",
      component: <AdminUserManagementDashboard />,
    },
    {
      name: "admin",
      key: "/admin/user-management/:id",
      route: "/admin/user-management/:id",
      component: <AdminUserManagement />,
    },
    {
      name: "admin",
      key: "/admin/livestock",
      route: "/admin/livestock",
      component: <AdminLiveStocks />,
    },
    {
      name: "admin",
      key: "/admin/livestock/:livestockName",
      route: "/admin/livestock/:livestockName",
      component: <AdminLiveStocksOverview />,
    },
    // user
    {
      name: "user",
      key: "/user/dashboard",
      route: "/user/dashboard",
      component: <UserDashboard />,
    },
    {
      name: "user",
      key: "/user/site-management",
      route: "/user/site-management",
      component: <SiteManagement />,
    },
    {
      name: "user",
      key: "/user/site-management/:gatewayName",
      route: "/user/site-management/:gatewayName",
      component: <GatewayManagement />,
    },
    {
      name: "user",
      key: "/user/site-management/:gatewayName/:branchName",
      route: "/user/site-management/:gatewayName/:branchName",
      component: <BranchManager />,
    },
    {
      name: "user",
      key: "/user/site-management/:gatewayName/:branchName/:deviceId",
      route: "/user/site-management/:gatewayName/:branchName/:deviceId",
      component: <Device />,
    },
    {
      name: "user",
      key: "/user/settings",
      route: "/user/settings",
      component: <Setting />,
    },
  ];

  return routes;
}
