import React from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { Breadcrumb, CustomTabs, BackdropLoader } from "../../ComponentsV2";
import { Typography, Container } from "@mui/material";
import LiveLocation from "./liveLocation";
import CreateGeoFence from "./createGeoFence";
import useMapContext from "../../hooks/useMapContext";

const Map = () => {
  const tabData = [
    {
      label: "live location",
      child: <LiveLocation />,
    },
    {
      label: "Geofence",
      child: <CreateGeoFence />,
    },
  ];

  const BreadcrumbData = [
    {
      label: "Geofence",
      link: "map",
    },
  ];
  const { snackbarAlert, onSnackbarAlertClose, openBackdropLoader } =
    useMapContext();
  return (
    <AdminUIContainer
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        <BackdropLoader open={openBackdropLoader} />
        <Breadcrumb data={BreadcrumbData} />
        <Typography variant="h2" sx={{ fontSize: "3rem", fontWeight: 600 }}>
          GeoFence
        </Typography>
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default Map;
