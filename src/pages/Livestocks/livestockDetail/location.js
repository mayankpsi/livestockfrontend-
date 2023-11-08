import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import LocationLog from "./locationLog";
import {
  TableV2,
  BtnGroup,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import useDateFormat from "../../../hooks/useDateFormat";
import useUserId from "../../../hooks/useUserId";

const tableHeadData = ["status", "location", "updated"];
const tableRowData = [
  {
    status: "safe",
    location: "45.454, 66.52",
    updated: "10:59 PM, 23/09/23",
  },
  {
    status: "unsafe",
    location: "45.454, 66.52",
    updated: "10:59 PM, 23/09/23",
  },
  {
    status: "safe",
    location: "45.454, 66.52",
    updated: "10:59 PM, 23/09/23",
  },
];

const btnData = [
  {
    label: "location",
  },
  {
    label: "analytics",
  },
];

const Location = ({ data }) => {
  const {
    showLocationTab,
    setShowLocationTab,
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
  const [locationAlertsData, setLocationAlertsData] = useState([]);
  const [resentAlerts, setResentAlerts] = useState([]);
  const [geofenceData, setGeofenceData] = useState({
    lat: null,
    lng: null,
    radius: 0,
  });
  const userId = useUserId();
  const tableColors = ["#06B95F", "#FC5555"];

  useEffect(() => {
    if (data?.id) {
      Promise.allSettled([
        request({ url: `/user/getUsersGeofence?userID=${userId}` }),
        request({
          url: `/liveStock/getliveStocklocationAlerts?liveStockID=${
            data?.id
          }&startDate=${paginationDateFormat(
            selectedDate[0]?.startDate
          )}&endDate=${paginationDateFormat(
            selectedDate[0]?.endDate
          )}&page=${paginationPageNo}&limit=${pageLimit}`,
        }),
        request({
          url: `/liveStock/getliveStocklocationAlerts?liveStockID=${
            data?.id
          }&startDate=${paginationDateFormat(
            new Date()
          )}&endDate=${paginationDateFormat(new Date())}&page=${1}&limit=${8}`,
        }),
      ])
        .then((res) => {
          const [res1, res2, res3] = res;
          if (res1?.value?.status === 200) {
            const { data } = res1.value?.data;
            setGeofenceData({
              lat: data?.lat,
              lng: data?.lng,
              radius: data?.radius,
            });
          } else {
            setGeofenceData({
              lat: null,
              lng: null,
              radius: 0,
            });
            throw new Error(res?.response?.data?.message);
          }

          if (res3?.value?.status === 200) {
            const { data } = res3.value?.data;
            const formattedData = data?.LocationAlert?.map((ele) => ({
              title: ele?.locationStatus,
              updated: formattedDate(ele?.createdAt),
            }));
            setResentAlerts(formattedData);
          } else {
            setResentAlerts([]);
            throw new Error(res?.response?.data?.message);
          }

          if (res2?.value?.status === 200) {
            const { data } = res2.value?.data;
            const formattedData = data?.LocationAlert?.map((ele) => ({
              title: ele?.locationStatus,
              location: `${getRoundOffDigit(
                ele?.geolocation?.lat,
                4
              )}, ${getRoundOffDigit(ele?.geolocation?.lng, 4)}`,
              updated: formattedDate(ele?.createdAt),
            }));
            setLocationAlertsData(formattedData);
            setPageCount(data?.totalPage);
          } else {
            setLocationAlertsData([]);
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
    <Stack my={2} direction="column" alignItems="center" gap={2}>
      <BtnGroup
        btnData={btnData}
        activeBtn={showLocationTab}
        onChange={(ele) => setShowLocationTab(ele)}
      />
      {showLocationTab === "location" ? (
        <Stack sx={{ width: "100%" }}>
          <LocationLog
            data={data}
            resentAlerts={resentAlerts}
            geofenceData={geofenceData}
          />
        </Stack>
      ) : (
        <Stack sx={{ width: "100%" }}>
          <Stack pb={2}>
            <TabPaneV2
              paneText={`showing ${
                locationAlertsData?.length < 10
                  ? locationAlertsData?.length
                  : "10"
              } out of 20 Alerts`}
              datePicker={true}
              paneTextColor="#000"
              btnText={
                <ExportAsCSV headers={[]} data={[]} fileName="alerts">
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
            paneText="activity log"
            paneTextColor="#B58B5D"
            isBtn={true}
            datePicker
            btnText="Export"
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={tableHeadData}
            tableRowData={locationAlertsData}
            tableColors={tableColors}
          />
          {locationAlertsData?.length ? (
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
      )}
    </Stack>
  );
};

export default Location;
