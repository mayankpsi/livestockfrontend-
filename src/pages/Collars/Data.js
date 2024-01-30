import ShowCollars from "./ShowCollars";
// SHOW COLLAR DETAIL DATA
import Overview from "./viewCollarDetails/overview";
import AssignLivestock from "./viewCollarDetails/assignLivestock";
import CollarLogs from "./viewCollarDetails/CollarLogs";
import { InfoOutlinedIcon, Battery5BarOutlinedIcon } from "../../icons";

export const collarTabData = [
  {
    label: "all",
    child: <ShowCollars show="all" />,
  },
  {
    label: "assigned",
    child: <ShowCollars show={true} />,
  },
  {
    label: "not assigned",
    child: <ShowCollars show={false} />,
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
export const viewCollarDetailTabData = (data, loading, setLoading) => [
  {
    label: "overview",
    child: <Overview data={data}/>,
  },
  {
    label: "assigned",
    child: (
      <AssignLivestock data={data} loading={loading} setLoading={setLoading} />
    ),
  },
  {
    label: "logs",
    child: <CollarLogs />,
  },
];

export const viewCollarDetailsBreadcrumbData = (data) => [
  {
    label: "Device management",
    link: "devices",
  },
  {
    label: data?.collarUid ? data.collarUid : "Collar UID",
    link: `devices/collar/${data?.collarId}`,
  },
];

export const statusCardData = [
  {
    text: "status",
    status: "online",
    icon: <InfoOutlinedIcon fontSize="large" sx={{ mr: 1 }} />,
    statusColor: "#347D00",
    suffix: "",
  },
  {
    text: "pedometer battery",
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
  {
    text: "collar battery",
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
