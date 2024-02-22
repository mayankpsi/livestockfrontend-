import React, { useEffect } from "react";
import { Typography, Paper, Stack, Box } from "@mui/material";
import { GetMap, SkeletonLoader, CustomSelect } from "../../ComponentsV2";
import { styled } from "@mui/system";
import {
  ButtonPrimary,
  ButtonOutlinedRound,
} from "../../ComponentsV2/themeComponents";
import useMapContext from "../../hooks/useMapContext";

const CreateGeoFence = () => {
  const {
    saveLocationData,
    onGeofenceEdit,
    getGeolocationAddress,
    geofenceCoordinates,
    isLoading,
    handleGeofenceAddressEdit,
    handleCreateGeofence,
    handleGeofenceSave,
    handleGeofenceCancel,
    handleGeofenceEdit,
    addCustomError,
    removeCustomError,
    isGeoFenceSave,
  } = useMapContext();

  const Para = styled(Typography)({
    fontSize: "2rem",
    fontWeight: 600,
    margin: "10px 0",
  });
  const ParaV2 = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: "15px 0",
  });
  const ParaV3 = styled(Typography)({
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: "5px 0 15px 0",
    textAlign: "justify",
  });

  const handleSubmit = () => {
    handleGeofenceSave();
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mt={3}
      sx={{ gap: { xl: 5, lg: 5, md: 3, sm: 2 } }}
    >
      <Stack
        direction="column"
        sx={{ width: { xl: "19%", lg: "25%", md: "25%", sm: "30%" } }}
      >
        {!geofenceCoordinates?.address ? (
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Para variant="h5">Step: 1</Para>
            <ParaV2 variant="h5">Mark Location on map manually</ParaV2>
            <Para variant="h2" sx={{ margin: "30px 0" }}>
              OR
            </Para>
            <ButtonPrimary
              variant="contained"
              sx={{
                width: "100%",
                padding: "5px 0",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => getGeolocationAddress(true, null, null)}
            >
              Auto detect location
            </ButtonPrimary>
          </Paper>
        ) : isLoading ? (
          <SkeletonLoader width={280} height={280} />
        ) : (
          <>
            <Paper elevation={2} sx={{ padding: 2, maxWidth: 280 }}>
              <Para variant="h5">Detected Location</Para>
              <ParaV2 variant="h5" sx={{ marginBottom: 0 }}>
                Address:
              </ParaV2>
              <ParaV3 variant="h5">{geofenceCoordinates?.address}</ParaV3>
              <ParaV2 variant="h5">Lat: {geofenceCoordinates?.farmLat}</ParaV2>
              <ParaV2 variant="h5">Lng: {geofenceCoordinates?.farmLng}</ParaV2>
              {localStorage.getItem("geofence") === "edit" ||
              !Boolean(localStorage.getItem("geofence")) ? (
                <ButtonPrimary
                  variant="contained"
                  sx={{
                    width: "100%",
                    padding: "5px 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={handleGeofenceAddressEdit}
                >
                  Edit
                </ButtonPrimary>
              ) : null}
            </Paper>
            <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
              <Para variant="h5">Step: 2</Para>
              <ParaV2 variant="h5">Draw Geofence on the map</ParaV2>
            </Paper>
            {localStorage.getItem("geofence") === "edit" ? null : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  margin: "20px 0",
                }}
              >
                {localStorage.getItem("geofence") === "done" ? (
                  <ButtonPrimary
                    variant="contained"
                    sx={{
                      width: "100px",
                      padding: "5px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={handleGeofenceEdit}
                  >
                    Edit
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary
                    variant="contained"
                    sx={{
                      width: "100px",
                      padding: "5px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={handleCreateGeofence}
                  >
                    Submit
                  </ButtonPrimary>
                )}
              </Box>
            )}
            {localStorage.getItem("geofence") === "edit" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  margin: "20px 0",
                }}
              >
                {localStorage.getItem("hideCancel") === "true" ? null : (
                  <ButtonOutlinedRound
                    variant="outlined"
                    sx={{ minWidth: "100px", borderRadius: 1 }}
                    onClick={handleGeofenceCancel}
                  >
                    Cancel
                  </ButtonOutlinedRound>
                )}
                <ButtonPrimary
                  variant="contained"
                  sx={{
                    width: "100px",
                    padding: "5px 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </ButtonPrimary>
              </Box>
            )}
          </>
        )}
      </Stack>
      {console.log(geofenceCoordinates, "bjngknbkgnjbngjnbjgnbjg")}
      <Stack sx={{ width: { xl: "81%", lg: "75%", md: "75%", sm: "70%" } }}>
        <GetMap
          mapWidth="100%"
          mapHeight="600px"
          geofenceCoordinates={geofenceCoordinates}
          createGeoFence={
            Boolean(localStorage.getItem("geofence"))
              ? localStorage.getItem("geofence") === "done"
                ? false
                : true
              : Boolean(geofenceCoordinates?.address)
          }
        />
      </Stack>
    </Stack>
  );
};

export default CreateGeoFence;
