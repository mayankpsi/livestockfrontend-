import React from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  CustomTabs,
  TabPane,
  CustomModal,
  BackdropLoader,
} from "../../ComponentsV2";
import { Container } from "@mui/material";
import AddCollarModalContent from "./AddCollarModalContent";
import { useContext } from "react";
import { CollarContext } from "../../context/CollarContext";
import {collarTabData} from "./Data";


const Collars = () => {
  const {
    openAddCollarModal,
    openBackdropLoader,
    handleCollarModalOpen,
    modalContentType,
    handleCollarModalClose,
    showConfirmModal,
    handleConfirmWindowClose,
    handleCollarDeleteConfirm,
    snackbarAlert,
    onSnackbarAlertClose,
  } = useContext(CollarContext);

  const contentType = () => {
    if (modalContentType === "add") {
      return <AddCollarModalContent />;
    }
  };

  const BreadcrumbData = [
    {
      label: "collar management",
      link: "collars",
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
      <Container maxWidth="xl" sx={{ marginTop: 8,pb:5 }}>
        <BackdropLoader open={openBackdropLoader} />
        <TabPane
          text="All Collars"
          btnText="Add New Collar"
          hover={true}
          btnIcon={true}
          onBtnClick={() => handleCollarModalOpen("add")}
        />
        <CustomModal
          content={contentType()}
          openModal={openAddCollarModal}
          handleClose={handleCollarModalClose}
        />
        <CustomTabs tabData={collarTabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default Collars;
