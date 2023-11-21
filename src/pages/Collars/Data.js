import ShowCollars from "./ShowCollars";
// SHOW COLLAR DETAIL DATA
import Overview from "./viewCollarDetails/overview";
import AssignLivestock from "./viewCollarDetails/assignLivestock";
import CollarLogs from "./viewCollarDetails/CollarLogs";
import {
    InfoOutlinedIcon,
    NetworkCellOutlinedIcon,
    Battery5BarOutlinedIcon,
  } from "../../icons";

export const collarTabData = [
  {
    label: "all",
    child: <ShowCollars show="all" />,
  },
  {
    label: "assigned",
    child: <ShowCollars show="assigned" />,
  },
  {
    label: "not assigned",
    child: <ShowCollars show="not assigned" />,
  },
];

export const showCollarTableHeadData = [
  "collar UID",
  "collar name",
  "power",
  "current status",
  "added on",
  "action",
];

// SHOW COLLAR DETAIL DATA

export const viewCollarDetailTabData = (data) => [
  {
    label: "overview",
    child: <Overview data={data} />,
  },
  {
    label: "assigned",
    child: <AssignLivestock data={data} />,
  },
  {
    label: "logs",
    child: <CollarLogs/>,
  },
];

export const viewCollarDetailsBreadcrumbData = (data) => [
  {
    label: "collar management",
    link: "collars",
  },
  {
    label: data?.collarUid ? data.collarUid : "Collar UID",
    link: `collars/${data?.collarUid}`,
  },
];


  export const statusCardData = [
    {
      text: "status",
      status: "online",
      icon: <InfoOutlinedIcon fontSize="large" sx={{ mr: 1 }} />,
      statusColor: "#347D00",
      suffix:""
    },
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
      suffix:""
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
      suffix:"%"
    },
  ];
