import ShowLivestocks from "./showLivestocks";
import { Box } from "@mui/material";
import {
  NetworkCellOutlinedIcon,
  Battery5BarOutlinedIcon,
  ThermostatIcon,
  MonitorHeartIcon,
  PetsIcon
} from "../../icons";
import { LiveStockSteps, LiveStockRumination } from "../../assets";

export const livestockTabData = [
  {
    label: "All Livestocks",
    child: <ShowLivestocks show="all" />,
  },
  {
    label: "Safe",
    child: <ShowLivestocks show="safe" />,
  },
  {
    label: "Unsafe",
    child: <ShowLivestocks show="unsafe" />,
  },
];

export const livestockBreadcrumbData = [
  {
    label: "livestocks",
    link: "livestocks",
  },
];

export const showLivestockTableHeadData = [
  "UID",
  "livestock name",
  "collar ID",
  "Added on",
  "current status",
  "last update",
  "action",
];

//LIVESTOCK DETAIL

export const livestockDetailAlertTableHeadData = [
  "alert name",
  "threshold value",
  "alarm value",
  "time",
  "date",
  "action",
];

// LIVESTOCK DETAIL :- COLLAR INFO

export const deviceInfoData = [
  {
    label: "Collar UID",
    value: "collar_1",
  },
  {
    label: "Collar Name",
    value: "device name",
  },
  {
    label: "Collar MAC ID",
    value: "#3537HDB83728",
  },
  {
    label: "Collar Added on",
    value: "24/02/23, 04:23 PM",
  },
];

export const statusCardData = [
  {
    text: "network strength",
    status: "good",
    icon: (
      <NetworkCellOutlinedIcon
        fontSize="large"
        sx={{ mr: 1, color: "#347D00" }}
      />
    ),
    statusColor: "#347D00",
    suffix: "",
  },
  {
    text: "battery",
    status: "56",
    icon: (
      <Battery5BarOutlinedIcon
        fontSize="large"
        sx={{ mr: 1, color: "#347D00" }}
      />
    ),
    statusColor: "#F19B4F",
    suffix: "%",
  },
];

// LIVESTOCK DETAIL :- HEALTH

export const chartCardData = [
  {
    label: "temperature",
    value: "56° F",
    icon: (
      <ThermostatIcon sx={{ fontSize: "3em", color: "rgba(253, 55, 48,1)" }} />
    ),
    iconBg: "#60AEDA",
    valueColor: "err-color",
    suffix: " °F",
  },
  {
    label: "heartbeat",
    value: "78/sec",
    icon: (
      <MonitorHeartIcon
        sx={{ fontSize: "3em", color: "rgba(253, 55, 48,1)" }}
      />
    ),
    iconBg: "rgba(253, 55, 48, 0.25)",
    valueColor: "color-success--dark ",
    suffix: "/min",
  },
  {
    label: "steps",
    value: "5000",
    icon: <Box component="img" src={LiveStockSteps} />,
    iconBg: "#A2F8F2",
    valueColor: "color-success--dark ",
    suffix: "/day",
  },
  {
    label: "rumination",
    value: "2h",
    icon: <Box component="img" src={LiveStockRumination} />,
    iconBg: "#A2F8F2",
    valueColor: "color-success--dark ",
    suffix: "/day",
  },
];

// LIVESTOCK DETAIL :- LOCATION

export const locationTableHeadData = ["status", "location", "updated"];

export const locationBtnData = [
  {
    label: "location",
  },
  {
    label: "analytics",
  },
];

// LIVESTOCK DETAIL :- OVERVIEW
  
  export const parameterCardData = [
    {
      label: "temperature",
      time: "10:59 PM, 23/08/23",
      value: "78° F",
      icon: <ThermostatIcon sx={{ fontSize: "3em", color: "#fff" }} />,
      iconBg: "#B58B5D",
      valueColor: "err-color",
      suffix: " °F",
    },
    {
      label: "heartbeat",
      time: "10:59 PM, 23/08/23",
      value: "78",
      icon: <MonitorHeartIcon sx={{ fontSize: "3em", color: "#fff" }} />,
      iconBg: "#47CD75",
      valueColor: "color-success--dark ",
      suffix: "/min",
    },
    {
      label: "steps",
      time: "10:59 PM, 23/08/23",
      value: "5000",
      icon: <PetsIcon sx={{ fontSize: "3em", color: "#B58B5D" }} />,
      iconBg: "#ECDEC6",
      valueColor: "color-success--dark ",
      suffix: "/day",
    },
  ];
