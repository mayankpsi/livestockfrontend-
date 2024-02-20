import React from "react";
import { Stack } from "@mui/material";
import {
  HeaderAdmin,
  Sidebar,
  ConfirmWindowModal,
  SnackbarAlert,
} from "../ComponentsV2";

const AdminUIContainer = ({
  BreadcrumbData,
  children,
  openModal,
  onConfirm,
  showConfirmBtn,
  handleModalClose,
  openAlert,
  closeAlert,
  alertMessage,
  alertType,
}) => {
  return (
    <>
      <ConfirmWindowModal
        openModal={openModal}
        onConfirm={onConfirm}
        showConfirmBtn={showConfirmBtn}
        onCancel={handleModalClose}
        handleClose={handleModalClose}
      />
      <SnackbarAlert
        open={openAlert}
        closeAlert={closeAlert}
        message={alertMessage}
        type={alertType}
      />
      <Stack direction={"row"}>
        <Stack
          sx={{
            width: "17%",
            position: "relative",
            display: { lg: "inline", md: "none", sm: "none" },
          }}
        >
          <Sidebar />
        </Stack>
        <Stack
          width={{ lg: "83%", md: "100%", sm: "100%" }}
          height={"100vh"}
          direction={"column"}
          alignItems={"flex-end"}
          sx={{
            top: "0px",
            backgroundColor: "white",
          }}
        >
          <Stack
            sx={{
              boxShadow: "0px 5px 5px -7px black",
              width: "100%",
            }}
          >
            <HeaderAdmin BreadcrumbData={BreadcrumbData} />
          </Stack>
          <Stack width="100%">{children}</Stack>
        </Stack>
      </Stack>

      {/* <Grid sx={{ marginBottom: "20px" }}>
        <Stack direction="column">
          <Grid
            sx={{
              width: "18%",
              position: "relative",
              display: { lg: "inline", md: "none", sm:'none' },
            }}
          >
            <Sidebar />
          </Grid>
          <Grid
            sx={{
              padding: "15px 0",
              top: "0px",
              backgroundColor: "white",
              zIndex: 999,
              height: "10vh",
              boxShadow: "0px 5px 5px -7px black",
              width: { lg: "85%", md: "100%", sm:'100%' },
            }}
          >
            <HeaderAdmin BreadcrumbData={BreadcrumbData}/>
            {children}
          </Grid>
        </Stack>
      </Grid> */}
    </>
  );
};

export default AdminUIContainer;
