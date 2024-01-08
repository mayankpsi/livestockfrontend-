import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { GetMap, CustomTable, NoData } from "../../ComponentsV2";
import useMapContext from "../../hooks/useMapContext";
import { request } from "../../apis/axios-utils";
import useErrorMessage from "../../hooks/useErrorMessage";

const LiveLocation = () => {
  const [getLivestockStatus, setGetLivestockStatus] = useState([]);

  const { geofenceCoordinates } = useMapContext();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    request({ url: "/liveStock/safeUnsafeLiveStock" })
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
      (ele) => ele?.liveStocklocationStatus?.toLowerCase() === filter
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
            id: ele?._id,
            safeUnsafeStatus: ele?.liveStocklocationStatus,
            position: {
              lat: ele?.geolocation?.lat,
              lng: ele?.geolocation?.lng,
            },
          }))}
        />
      </Stack>
      {getLivestockStatus?.length ? (
        <Stack direction="row" justifyContent="space-between" gap={5}>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#347D00"
              tableHeadData={["Safe Livestock", "Collar", "Pedometer"]}
              tableRowData={getFilteredLivestock(
                getLivestockStatus,
                "safe"
              )?.map((ele) => ({
                liveStockName: ele?.name,
                collar: ele?.collarDevice?.deviceName || "N/A",
                pedometer: ele?.pedometerDevice?.deviceName || "N/A",
              }))}
            />
            {!getFilteredLivestock(getLivestockStatus, "safe").length && (
              <NoData />
            )}
          </Box>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#FF0505"
              tableHeadData={["Unsafe Livestock", "Collar", "Pedometer"]}
              tableRowData={getFilteredLivestock(
                getLivestockStatus,
                "unsafe"
              )?.map((ele) => ({
                liveStockName: ele?.name,
                collar: ele?.collarDevice?.deviceName || "N/A",
                pedometer: ele?.pedometerDevice?.deviceName || "N/A",
              }))}
            />
            {!getFilteredLivestock(getLivestockStatus, "unsafe").length && (
              <NoData />
            )}
          </Box>
        </Stack>
      ) : null}
    </>
  );
};

export default LiveLocation;
