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
      title: "collars",
      link: "/collars",
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
  