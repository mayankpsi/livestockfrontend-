import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import {
  AlertCard,
  TableV2,
  TabPaneV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
} from "../../../ComponentsV2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { request } from "../../../apis/axios-utils";

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
const Alerts = ({ data }) => {
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
    selectedDate,
    setSelectedDate,
    paginationPageNo,
    setPaginationPageNo,
    pageCount,
    setPageCount,
    pageLimit,
  } = useLivestockContext();
  const { paginationDateFormat, formattedDate, getRoundOffDigit } =
    useDateFormat();
    const [singleLivestockAlerts, setSingleLivestockAlerts] = useState([])

  useEffect(() => {
    if (data?.id) {
      request({
        url: `/liveStock/getSingleLiveStockAllAlerts?liveStockID=${
          data?.id
        }&startDate=${paginationDateFormat(
          selectedDate[0]?.startDate
        )}&endDate=${paginationDateFormat(
          selectedDate[0]?.endDate
        )}&page=${paginationPageNo}&limit=${pageLimit}`,
      })
        .then((res) => {
          if (res.status === 200) {
            const { data } = res.data;
            const formattedData = data?.LiveStockAlertData?.map((ele) => ({
              id:ele?._id,
              alertName: ele?.message,
              thresholdValue: ele?.thresholdValue,
              alarmValue: getRoundOffDigit(ele?.alertValue,2),
              time: formattedDate(ele?.createdAt,"time"),
              date: formattedDate(ele?.createdAt,"date"),
            }));
            setSingleLivestockAlerts(formattedData);
            setPageCount(data?.totalPage);
          } else {
            setSingleLivestockAlerts([]);
            throw new Error(res?.response?.data?.message);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [data?.id, paginationPageNo, selectedDate]);

  useEffect(() => {
    setPaginationPageNo(1);
  }, [selectedDate]);

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
        <Stack pb={2}>
          <TabPaneV2
            paneText={`showing ${
              singleLivestockAlerts?.length < 10 ? singleLivestockAlerts?.length : "10"
            } out of 20 Alerts`}
            paneTextColor="#000"
            datePicker={true}
            btnText={
              <ExportAsCSV headers={tableHeadData} data={[]} fileName="alerts">
                Export
              </ExportAsCSV>
            }
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        <TableV2
          paneText="showing 10 out of 20 Alerts"
          paneTextColor="#000"
          isBtn={true}
          btnText="export"
          datePicker={true}
          btnColor="#fff"
          btnBg="#B58B5D"
          tableHeadData={tableHeadData}
          tableRowData={singleLivestockAlerts.map(ele => ({
            ...ele,
            action: [
              <DeleteOutlineOutlinedIcon
                fontSize="large"
                //   onClick={() => handleLivestockDelete(col?._id)}
              />,
            ],
          })).map(ele => {
            delete ele.id;
            return ele
          })}
        />
        {singleLivestockAlerts?.length ? (
          pageCount > 1 ? (
            <Stack direction="row" justifyContent="center">
              <CustomPagination
                size="large"
                count={pageCount}
                page={paginationPageNo}
                onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
              />
            </Stack>
          ) : null
        ) : (
          <NoData />
        )}
      </Stack>
    </Stack>
  );
};

export default Alerts;
