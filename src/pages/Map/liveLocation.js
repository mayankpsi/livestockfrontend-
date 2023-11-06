import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { GetMap, CustomTable } from "../../ComponentsV2";
import useMapContext from "../../hooks/useMapContext";
import { request } from "../../apis/axios-utils";


const LiveLocation = () => {
  const [getLivestockStatus, setGetLivestockStatus] = useState([]);

  const { geofenceCoordinates } = useMapContext();

  useEffect(() => {
    request({ url: "/devices/isDeviceWithInGeofence" })
      .then((res) => {
        console.log(res, "setGetLivestockStatus")
        if (res?.status === 200) {
          setGetLivestockStatus(res?.data?.data);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // alert(err.message)
      });
  }, []);
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
        />
      </Stack>
      {
        getLivestockStatus?.length?(
          <Stack direction="row" justifyContent="space-between" gap={5}>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#347D00"
              tableHeadData={["Safe Livestock", "Device"]}
              tableRowData={getLivestockStatus?.filter(ele => ele?.liveStockIsSafeOrNot?.status?.toLowerCase() === "safe").map(ele => ({
                liveStockName:ele.liveStockName,
                deviceName:ele.deviceName
              }))}
            />
          </Box>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <CustomTable
              headBackgroundColor="#FF0505"
              tableHeadData={["Unsafe Livestock", "Device"]}
              tableRowData={getLivestockStatus?.filter(ele => ele?.liveStockIsSafeOrNot?.status?.toLowerCase() === "unsafe").map(ele => ({
                liveStockName:ele.liveStockName,
                deviceName:ele.deviceName
              }))}
            />
          </Box>
        </Stack>
        ):null
      }
     
    </>
  );
};

export default LiveLocation;
