import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  GetMap,
  CustomTable,
  NoData,
  Skeleton,
  TableSkeleton,
} from "../../../../ComponentsV2";
import useGeofenceAndLivestock from "../hooks/useGeofenceAndLivestock";
import toast from "react-hot-toast";

const UserGeofenceAdmin = () => {
  const {
    isLoading,
    error,
    geofenceData,
    allLivestockMapData,
    safeLivestock,
    unsafeLivestock,
  } = useGeofenceAndLivestock();

  if (error) {
    toast.error(error?.message || "Server Error");
  }

  return (
    <>
      {"id" in geofenceData ? (
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", marginTop: 3 }}
          >
            {isLoading ? (
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
                geofenceCoordinates={geofenceData}
                isLivestocks={true}
                livestockData={allLivestockMapData}
              />
            )}
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={5}>
            {isLoading ? (
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
                  tableRowData={safeLivestock}
                />
                {!safeLivestock?.length && <NoData />}
              </Box>
            )}

            {isLoading ? (
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
                  tableRowData={unsafeLivestock}
                />
                {!unsafeLivestock?.length && <NoData />}
              </Box>
            )}
          </Stack>
        </Stack>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default UserGeofenceAdmin;
