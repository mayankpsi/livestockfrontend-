import React, { useState, useEffect } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  Breadcrumb,
  BackdropLoader,
  TableV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
} from "../../ComponentsV2";
import { Container, Stack } from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { request } from "../../apis/axios-utils";
import useDateFormat from "../../hooks/useDateFormat";

const tableHeadData = [
  "alert name",
  "collar Uid",
  "Livestock name",
  "threshold value",
  "alarm value",
  "time",
  "date",
  "action",
];

const tableRowData = [
  {
    alertName: "high temperature alert",
    collarUid: "C_1",
    livestockName: "Mori",
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
    collarUid: "C_2",
    livestockName: "Mori",
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
    collarUid: "C_3",
    livestockName: "Mori",
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
    collarUid: "C_4",
    livestockName: "Mori",
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
    collarUid: "C_5",
    livestockName: "Mori",
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
    collarUid: "C_6",
    livestockName: "Mori",
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
    collarUid: "C_7",
    livestockName: "Mori",
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
    collarUID: "C_8",
    livestockName: "Mori",
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
    collarUID: "C_9",
    livestockName: "Mori",
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
    collarUID: "C_10",
    livestockName: "Mori",
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

const BreadcrumbData = [
  {
    label: "Alerts",
    link: "alerts",
  },
];

const exportHeaders = tableHeadData
  .map((ele) => ({
    label: ele,
    key: ele
      .split(" ")
      .map((ele, ind) => {
        if (ind === 0) return ele.toLocaleLowerCase();
        else return ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase();
      })
      .join(""),
  }))
  .filter((ele) => ele.label !== "action");

const exportData = tableRowData.map((ele) => {
  delete ele.action;
  return ele;
});

const AlertsPage = () => {
  const [AllAlertData, setAllAlertData] = useState([]);
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const pageLimit = 10;

  const { formattedDate, paginationDateFormat } = useDateFormat();

  const getRoundOffDigit = (name, value) => {
    if (name.toLocaleLowerCase().includes("geofence")) {
      const rounded = Math.round(value * 10) / 10;
      const deciOne = rounded.toFixed(1);
      const  final = deciOne > 1? `${deciOne} Km`:`${deciOne*1000} m`;
      return final;
    } else {
      return value;
    }
  };

  useEffect(() => {
    setOpenBackdropLoader(true);
    request({
      url: `/liveStock/getUsersLiveStockAllAlerts?startDate=${paginationDateFormat(
        selectedDate[0]?.startDate
      )}&page=${paginationPageNo}&limit=${pageLimit}&endDate=${paginationDateFormat(
        selectedDate[0]?.endDate
      )}`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const data = res?.data?.data?.alertData || [];
          const formattedData = data?.map((alert) => ({
            alertName: alert?.message,
            collarUid: alert?.assignedDevice?.uID,
            livestockName: alert?.liveStockName,
            thresholdValue: alert?.thresholdValue,
            alarmValue: getRoundOffDigit(alert?.message, alert?.alertValue),
            time: formattedDate(alert?.createdAt, "time"),
            date: formattedDate(alert?.createdAt, "date"),
          }));
          setAllAlertData(formattedData);
        } else {
          throw new Error("something went wrong");
        }
        // const formattedData =
        // setCollars(formattedData);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  }, [selectedDate, paginationPageNo]);

  //date change send a request again
  // page change do the same

  return (
    <AdminUIContainer>
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        <BackdropLoader open={openBackdropLoader} />
        <Breadcrumb data={BreadcrumbData} />
        <TypographyPrimary>Alerts</TypographyPrimary>
        {/* <ExportAsCSV
          headers={exportHeaders}
          data={exportData}
          fileName="alerts"
        /> */}
        <Stack sx={{ width: "100%", py: 3 }}>
          <TableV2
            paneText="showing 10 out of 20 Alerts"
            paneTextColor="#000"
            btnText="export"
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            tableHeadData={tableHeadData}
            tableRowData={AllAlertData?.map((ele) => ({
              ...ele,
              action: [
                <DeleteOutlineOutlinedIcon
                  fontSize="large"
                  //   onClick={() => handleLivestockDelete(col?._id)}
                />,
              ],
            }))}
          />
        </Stack>
        {AllAlertData?.length ? (
          <Stack direction="row" justifyContent="center">
            <CustomPagination
              size="large"
              count={100}
              onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
            />
          </Stack>
        ) : (
          <NoData />
        )}
      </Container>
    </AdminUIContainer>
  );
};

export default AlertsPage;
