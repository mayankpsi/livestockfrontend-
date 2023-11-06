import { Stack } from "@mui/material";
import {AlertCard, TableV2} from "../../../ComponentsV2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useLivestockContext from "../../../hooks/useLivestockContext";

const labelData = [
  {
    label: "low temperature",
    type: "warning",
    value: "26 C",
  },
  {
    label: "high temperature",
    type: "error",
    value: "40 C",
  },
];

const geofenceData = [
  {
    label: "low temperature",
    type: "warning",
    value: "26 C",
  },
];

const tableHeadData = [
  "alert name",
  "threshold value",
  "alarm value",
  "time",
  "date",
  "action",
];
const tableRowData = [
  {
    alertName: "high temperature alert",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
    action: [
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        //   onClick={() => handleLivestockDelete(col?._id)}
      />,
    ],
  },
  {
    alertName: "high temperature alert",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
    action: [
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        //   onClick={() => handleLivestockDelete(col?._id)}
      />,
    ],
  },
  {
    alertName: "high temperature alert",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
    action: [
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        //   onClick={() => handleLivestockDelete(col?._id)}
      />,
    ],
  },
  {
    alertName: "high temperature alert",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
    action: [
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        //   onClick={() => handleLivestockDelete(col?._id)}
      />,
    ],
  },
];
const Alerts = () => {
  const {
    tempThreshold,
    handleLivestockTempAlertsChange,
    isLivestockTempAlertsEdit,
    serIsLivestockTempAlertsEdit,
    heartbeatThreshold,
    isLivestockHeartbeatAlertsEdit,
    setIsLivestockHeartbeatAlertsEdit,
    geofenceThreshold,
    isLivestockGeofenceAlertsEdit,
    setIsLivestockGeofenceAlertsEdit,
    handleLivestockHeartbeatAlertsChange,
    handleLivestockGeofenceAlertsChange,
    humidityThreshold,
    handleLivestockHumidityAlertsChange,
    isLivestockHumidityAlertsEdit,
    setIsLivestockHumidityAlertsEdit,
  } = useLivestockContext()
  return (
    <Stack my={4}>
      <Stack direction="row" flexWrap="wrap" width="100%" gap={3}>
        <AlertCard
          paneText="set temperature threshold"
          valueSuffix="C"
          labelData={tempThreshold}
          onChange={handleLivestockTempAlertsChange}
          isEdit={isLivestockTempAlertsEdit}
          onBtnClick={() =>
            serIsLivestockTempAlertsEdit(!isLivestockTempAlertsEdit)
          }
        />
        <AlertCard
          paneText="set heartbeat threshold"
          valueSuffix="/sec"
          labelData={heartbeatThreshold}
          onChange={handleLivestockHeartbeatAlertsChange}
          isEdit={isLivestockHeartbeatAlertsEdit}
          onBtnClick={() =>
            setIsLivestockHeartbeatAlertsEdit(!isLivestockHeartbeatAlertsEdit)
          }
        />
        <AlertCard
          paneText="set humidity threshold"
          valueSuffix="%"
          labelData={humidityThreshold}
          onChange={handleLivestockHumidityAlertsChange}
          isEdit={isLivestockHumidityAlertsEdit}
          onBtnClick={() =>
            setIsLivestockHumidityAlertsEdit(!isLivestockHumidityAlertsEdit)
          }
        />
        <AlertCard
          paneText="set geofence threshold"
          valueSuffix="m"
          labelData={geofenceThreshold}
          onChange={handleLivestockGeofenceAlertsChange}
          isEdit={isLivestockGeofenceAlertsEdit}
          onBtnClick={() =>
            setIsLivestockGeofenceAlertsEdit(!isLivestockGeofenceAlertsEdit)
          }
        />
      </Stack>
      <Stack sx={{ width: "100%", py: 3 }}>
        <TableV2
          paneText="showing 10 out of 20 Alerts"
          paneTextColor="#000"
          isBtn={true}
          btnText="export"
          datePicker={true}
          btnColor="#fff"
          btnBg="#B58B5D"
          tableHeadData={tableHeadData}
          tableRowData={tableRowData}
        />
      </Stack>
    </Stack>
  );
};

export default Alerts;
