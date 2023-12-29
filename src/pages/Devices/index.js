import React, { useContext, useState } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { Container, Stack } from "@mui/material";
import { BtnGroup } from "../../ComponentsV2";
import Collars from "../Collars/Collars";
import Pedometer from "../Padometer/Pedometer";
import { CollarContext } from "../../context/CollarContext";

const Devices = () => {
  const [activeDevice, setActiveDevice] = useState("collar");
  const {
    showConfirmModal,
    handleConfirmWindowClose,
    handleCollarDeleteConfirm,
    snackbarAlert,
    onSnackbarAlertClose,
  } = useContext(CollarContext);

  const devicesTabData = [
    {
      label: "collar",
    },
    {
      label: "pedometer",
    },
  ];

  const BreadcrumbData = [
    {
      label: "Device management",
      link: "devices",
    },
  ];
  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={handleCollarDeleteConfirm}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 6,
          pb: 5,
          p: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BtnGroup
          btnData={devicesTabData}
          activeBtn={activeDevice}
          onChange={(ele) => setActiveDevice(ele)}
        />
        <Stack width="100%">
          {activeDevice === "collar" ? <Collars /> : <Pedometer />}
        </Stack>
      </Container>
    </AdminUIContainer>
  );
};

export default Devices;
