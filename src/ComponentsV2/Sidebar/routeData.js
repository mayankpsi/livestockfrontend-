import {
    NotificationsNoneOutlinedIcon,
    AccountBoxOutlinedIcon,
    DashboardOutlinedIcon,
    LocationOnOutlinedIcon,
    PetsOutlinedIcon,
    GroupWorkOutlinedIcon,
  } from "../../icons";
  
export const routes = [
    {
      icon: DashboardOutlinedIcon,
      title: "dashboard",
      link: "/",
    },
    {
      icon: LocationOnOutlinedIcon,
      title: "map",
      link: "/map",
    },
    {
      icon: GroupWorkOutlinedIcon,
      title: "devices",
      link: "/devices",
    },
    {
      icon: PetsOutlinedIcon,
      title: "livestocks",
      link: "/livestocks",
    },
    {
      icon: NotificationsNoneOutlinedIcon,
      title: "alerts",
      link: "/alerts",
    },
    {
      icon: AccountBoxOutlinedIcon,
      title: "profile",
      link: "/profile",
    },
  ];
  