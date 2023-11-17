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
import {locationTableHeadData, locationBtnData} from "../Data";




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
    setOpenBackdropLoader,
    openSnackbarAlert
  } = useLivestockContext();
  const { paginationDateFormat, formattedDate, getRoundOffDigit } =
    useDateFormat();
  const [locationAlertsData, setLocationAlertsData] = useState([]);
  const [resentAlerts, setResentAlerts] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [geofenceData, setGeofenceData] = useState({
    lat: null,
    lng: null,
    radius: 0,
  });
  const userId = useUserId();
  const tableColors = ["#06B95F", "#FC5555"];

  useEffect(() => {
    if (data?.id) {
      setOpenBackdropLoader(true)
      Promise.allSettled([
        request({ url: `/user/getUsersGeofence?userID=${userId}`}),
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
          )}&endDate=${paginationDateFormat(new Date())}&page=${1}&limit=${7}`,
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
              location: `${ele?.geolocation?.lat?.toString()?.slice(0,8)}, ${ele?.geolocation?.lng?.toString()?.slice(0,8)}`,
              updated: formattedDate(ele?.createdAt),
            }));
            setLocationAlertsData(formattedData);
            setPageCount(data?.PageCount);
            setDataLength(data?.dataLength);
          } else {
            const msg = res2?.value?.response?.data?.message || "Something went wrong";
            setLocationAlertsData([]);
            setPageCount(1);
            setDataLength(0);
            throw new Error(msg);
          }
        })
        .catch((err) => openSnackbarAlert("error",err.message))
        .finally(()=> setOpenBackdropLoader(false))
    }
  }, [data?.id, paginationPageNo, selectedDate]);

  useEffect(() => {
    setPaginationPageNo(1);
  }, [selectedDate]);

  const getExportedData = (data) => {
        const DeepCopiedData = JSON.parse(JSON.stringify(data));
        const formattedData = DeepCopiedData?.map(ele => {
          const obj = {
            ...ele,
            status:ele?.title
          }
          delete ele.title;
          return obj;
        });
        return formattedData;
  }

  const handleSnackBarAlert = () => {
    if(!dataLength){
      openSnackbarAlert("error","Nothing to Export")
    }
  }

  return (
    <Stack my={2} direction="column" alignItems="center" gap={2}>
      <BtnGroup
        btnData={locationBtnData}
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
                dataLength < 10
                  ? dataLength
                  : "10"
              } out of ${dataLength} Alerts`}
              datePicker={true}
              paneTextColor="#000"
              clearBtn={false}
              btnText={dataLength?
                <ExportAsCSV
                  headers={locationTableHeadData}
                  data={getExportedData(locationAlertsData)}
                  fileName="alerts"
                >
                  Export
                </ExportAsCSV>:"Export"
              }
              onBtnClick={handleSnackBarAlert}
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
            tableHeadData={locationTableHeadData}
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
