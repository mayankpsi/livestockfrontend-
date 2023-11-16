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
import { alertsThresholdData } from "./alertThresholdData";

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
const Alerts = ({ data, alertsThresholds, setAlertsThresholds }) => {
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
    handleAlertDelete
  } = useLivestockContext();
  const { paginationDateFormat, formattedDate, getRoundOffDigit } =
    useDateFormat();
  const [singleLivestockAlerts, setSingleLivestockAlerts] = useState([]);
  const [alertsDataLength, setAlertsDataLength] = useState(0);
  const [alertsThreshold, setAlertsThreshold] = useState(alertsThresholdData);

  const [alertsThresholdChange, setAlertsThresholdChange] = useState({
    lowTemp: 0,
    highTemp: 0,
    lowHeartbeat: 0,
    highHeartbeat: 0,
    lowSteps: 0,
    highSteps: 0,
    lowRumination: 0,
    highRumination: 0,
  });

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
              id: ele?._id,
              alertName: ele?.message,
              thresholdValue: ele?.thresholdValue,
              alarmValue: getRoundOffDigit(ele?.alertValue, 2),
              time: formattedDate(ele?.createdAt, "time"),
              date: formattedDate(ele?.createdAt, "date"),
            }));
            setSingleLivestockAlerts(formattedData);
            setPageCount(data?.totalPage);
            setAlertsDataLength(data?.dataLength);
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

  const handleThresholdEdit = (id) => {
    const updatedData = alertsThresholds?.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          isEdit: !ele?.isEdit,
        };
      } else return ele;
    });

    setAlertsThresholds(updatedData);
  };

  const handleThresholdChange = (event, id) => {
    const { name, value } = event?.target;
    const updatedData = alertsThresholds?.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          value: {
            ...ele.value,
            [name]: value,
          },
        };
      } else return ele;
    });
    setAlertsThresholds(updatedData);
  };

  const handleThresholdAlertSubmit = async (id) => {
    const body = {};

    alertsThresholds?.forEach((el) => {
      body[el.label] = el.value;
    });

    try {
      if (data?.id) {
        const res = await request({
          url: `/liveStock/updateLiveStockThreshold?liveStockId=${data?.id}`,
          method: "PATCH",
          data: body,
        });
      }
    } catch (error) {}

    console.log("submit");
    handleThresholdEdit(id);
  };

  return (
    <Stack my={4}>
      <Stack direction="row" flexWrap="wrap" width="100%" gap={3}>
        {alertsThresholds?.map((ele) => (
          <AlertCard
            key={ele?.id}
            paneText={`set ${ele?.label} threshold`}
            label={ele?.label}
            valueSuffix={ele?.suffix}
            labelData={ele?.value}
            isEdit={ele?.isEdit}
            onChange={(event) => handleThresholdChange(event, ele?.id)}
            onBtnClick={() =>
              ele?.isEdit
                ? handleThresholdAlertSubmit(ele?.id)
                : handleThresholdEdit(ele?.id)
            }
          />
        ))}
      </Stack>
      <Stack sx={{ width: "100%", py: 3 }}>
        <Stack pb={2}>
          <TabPaneV2
            paneText={`showing ${
              alertsDataLength < 10 ? alertsDataLength : 10
            } out of ${alertsDataLength} Alerts`}
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
          tableRowData={singleLivestockAlerts
            .map((ele) => ({
              ...ele,
              action: [
                <DeleteOutlineOutlinedIcon
                  fontSize="large"
                  onClick={() => handleAlertDelete(ele.id)}
                />,
              ],
            }))
            .map((ele) => {
              delete ele.id;
              return ele;
            })}
        />
        {singleLivestockAlerts?.length ? (
          alertsDataLength > 10 ? (
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
