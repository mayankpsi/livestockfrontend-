import React from "react";
import { Stack, Box } from "@mui/material";
import {
  GetMap,
  LocationStatusCard,
  TableV2,
  NoData,
  TabPaneV2,
} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";

const logData = [
  {
    title: "safe",
    time: "10:59 PM, 23/08/23",
  },
  {
    title: "unsafe",
    time: "10:59 PM, 23/08/23",
  },
  {
    title: "safe",
    time: "10:59 PM, 23/08/23",
  },
  {
    title: "unsafe",
    time: "10:59 PM, 23/08/23",
  },
  {
    title: "safe",
    time: "10:59 PM, 23/08/23",
  },
  {
    title: "unsafe",
    time: "10:59 PM, 23/08/23",
  },
  {
    title: "safe",
    time: "10:59 PM, 23/08/23",
  },
];

const tableColors = ["#06B95F", "#FC5555"];

const tableHeadData = [];
const LocationLog = ({ data, resentAlerts, geofenceData }) => {
  const { setShowLocationTab } = useLivestockContext();

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xl: "row", lg: "row", sm: "column-reverse" },
        width: "100%",
      }}
      gap={4}
    >
      <Stack sx={{ width: { xl: "30%", lg: "30%", sm: "100%" } }} gap={2}>
        <LocationStatusCard data={data} />
        <Box className="border-10" sx={{ overflow: "hidden" }}>
          {resentAlerts?.length ? (
            <>
              <Stack pb={2}>
                <TabPaneV2
                  paneText="Location Status Log"
                  paneTextColor="#000"
                  btnText="See all"
                  btnColor="#fff"
                  btnBg="#B58B5D"
                  datePicker={false}
                  onBtnClick={() => setShowLocationTab("analytics")}
                />
              </Stack>
              <TableV2
                paneText="location status log"
                paneTextColor="#B58B5D"
                btnText="See All"
                isBtn={true}
                btnColor="#fff"
                btnBg="#B58B5D"
                tableHeadData={tableHeadData}
                tableRowData={resentAlerts}
                tableColors={tableColors}
                onBtnClick={() => setShowLocationTab("analytics")}
              />
            </>
          ) : (
            <NoData />
          )}
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <GetMap
          mapWidth="100%"
          mapHeight="545px"
          geofenceCoordinates={geofenceData}
          isLivestocks={true}
          livestockData={[
            {
              id: Date.now(),
              position: {
                lat: data?.geolocation?.lat,
                lng: data?.geolocation?.lng,
              },
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};

export default LocationLog;
