import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  GetMap,
  CustomTable,
  NoData,
  Skeleton,
  TableSkeleton,
} from "../../ComponentsV2";
import useMapContext from "../../hooks/useMapContext";
import { request } from "../../apis/axios-utils";
import useErrorMessage from "../../hooks/useErrorMessage";

const LiveLocation = () => {
  const [getLivestockStatus, setGetLivestockStatus] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const { geofenceCoordinates, openBackdropLoader } = useMapContext();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    setTableLoading(true);
    request({ url: "/liveStock/safeUnsafeLiveStock" })
      .then((res) => {
        if (res?.status === 200) {
          setGetLivestockStatus(res?.data?.data?.livestock_info);
        } else {
          setGetLivestockStatus([]);
          throw new Error(getErrorMessage(res));
        }
      })
      .catch((err) => {
        // alert(err.message)
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, []);

  const getFilteredLivestock = (data, filter) => {
    const filteredData = data?.filter(
      (ele) => ele?.liveStocklocationStatus?.toLowerCase() === filter
    );
    return filteredData || [];
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", marginTop: 3 }}
      >
        {openBackdropLoader ? (
          <Skeleton
            height={"500px"}
            width={"77.5vw"}
            sx={{
              background: "#eee",
            }}
          />
        ) : (
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
        )}
      </Stack>

      <Stack direction="row" justifyContent="space-between" gap={5}>
        {tableLoading ? (
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <TableSkeleton
              rowNumber={new Array(1).fill(0)}
              tableCell={new Array(3).fill("33.33%")}
              showOption={[]}
            />
          </Box>
        ) : (
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#347D00"
              tableHeadData={["Safe Livestock", "Collar", "Pedometer"]}
              tableRowData={getFilteredLivestock(
                getLivestockStatus,
                "safe"
              )?.map((ele) => ({
                liveStockName: ele?.name,
                collar: ele?.assignedDevice?.collarDevice?.deviceName || "N/A",
                pedometer:
                  ele?.assignedDevice?.pedometerDevice?.deviceName || "N/A",
              }))}
            />
            {!getFilteredLivestock(getLivestockStatus, "safe")?.length && (
              <NoData />
            )}
          </Box>
        )}

        {tableLoading ? (
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <TableSkeleton
              rowNumber={new Array(1).fill(0)}
              tableCell={new Array(3).fill("33.33%")}
              showOption={[]}
            />
          </Box>
        ) : (
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#FF0505"
              tableHeadData={["Unsafe Livestock", "Collar", "Pedometer"]}
              tableRowData={getFilteredLivestock(
                getLivestockStatus,
                "unsafe"
              )?.map((ele) => ({
                liveStockName: ele?.name,
                collar: ele?.assignedDevice?.collarDevice?.deviceName || "N/A",
                pedometer:
                  ele?.assignedDevice?.pedometerDevice?.deviceName || "N/A",
              }))}
            />
            {!getFilteredLivestock(getLivestockStatus, "unsafe")?.length && (
              <NoData />
            )}
          </Box>
        )}
      </Stack>
    </>
  );
};

export default LiveLocation;
