import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { GetMap, CustomTable, NoData } from "../../ComponentsV2";
import useMapContext from "../../hooks/useMapContext";
import { request } from "../../apis/axios-utils";
import useErrorMessage from "../../hooks/useErrorMessage";

const safe = [
  {
    liveStockName: "Cow 1",
    deviceName: "Collar1",
  },
  {
    liveStockName: "Cow 2",
    deviceName: "Collar2",
  },
  {
    liveStockName: "Cow 3",
    deviceName: "Collar4",
  },
  {
    liveStockName: "Cow 4",
    deviceName: "Collar4",
  },
  {
    liveStockName: "Cow 5",
    deviceName: "Collar5",
  },
  {
    liveStockName: "Cow 6",
    deviceName: "Collar6",
  },
  {
    liveStockName: "Cow 7",
    deviceName: "Collar7",
  },
  {
    liveStockName: "Cow 8",
    deviceName: "Collar8",
  },
  {
    liveStockName: "Cow 9",
    deviceName: "Collar9",
  },
  {
    liveStockName: "Cow 10",
    deviceName: "Collar10",
  },
];

const unsafe = [
  {
    liveStockName: "Cow 11",
    deviceName: "Collar 11",
  },
  {
    liveStockName: "Cow 12",
    deviceName: "Collar 12",
  },
];

const LiveLocation = () => {
  const [getLivestockStatus, setGetLivestockStatus] = useState([]);

  const { geofenceCoordinates } = useMapContext();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    request({ url: "/devices/isDeviceWithInGeofence" })
      .then((res) => {
        if (res?.status === 200) {
          setGetLivestockStatus(res?.data?.data);
        } else {
          throw new Error(getErrorMessage(res));
        }
      })
      .catch((err) => {
        // alert(err.message)
      });
  }, []);

  const getFilteredLivestock = (data, filter) => {
    const filteredData = data?.filter(
      (ele) => ele?.liveStockIsSafeOrNot?.status?.toLowerCase() === filter
    );
    return filteredData;
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", marginTop: 3 }}
      >
        <GetMap
          mapWidth="100%"
          mapHeight="500px"
          geofenceCoordinates={geofenceCoordinates}
          isLivestocks={true}
          livestockData={getLivestockStatus?.map((ele) => ({
            id: ele?.liveStockId,
            safeUnsafeStatus: ele?.liveStockIsSafeOrNot?.status,
            position: {
              lat: ele?.location?.latitude,
              lng: ele?.location?.longitude,
            },
          }))}
        />
      </Stack>
      {getLivestockStatus?.length ? (
        <Stack direction="row" justifyContent="space-between" gap={5}>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#347D00"
              tableHeadData={["Safe Livestock", "Device"]}
              // tableRowData={getFilteredLivestock(
              //   getLivestockStatus,
              //   "safe"
              // )?.map((ele) => ({
              //   liveStockName: ele.liveStockName,
              //   deviceName: ele.deviceName || "N/A",
              // }))}
              tableRowData={safe}
            />
            {/* {!getFilteredLivestock(getLivestockStatus, "safe").length && (
              <NoData />
            )} */}
          </Box>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#FF0505"
              tableHeadData={["Unsafe Livestock", "Device"]}
              // tableRowData={getFilteredLivestock(
              //   getLivestockStatus,
              //   "unsafe"
              // )?.map((ele) => ({
              //   liveStockName: ele.liveStockName,
              //   deviceName: ele.deviceName || "N/A",
              // }))}
              tableRowData={unsafe}
            />
            {/* {!getFilteredLivestock(getLivestockStatus, "unsafe").length && (
              <NoData />
            )} */}
          </Box>
        </Stack>
      ) : null}
    </>
  );
};

export default LiveLocation;
