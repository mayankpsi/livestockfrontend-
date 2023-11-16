import React from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  Breadcrumb,
  CustomTabs,
  TabPane,
  CustomModal,
  BackdropLoader,
} from "../../ComponentsV2";
import { Container } from "@mui/material";
import ShowCollars from "./ShowCollars";
import AddCollarModalContent from "./AddCollarModalContent";
import { useContext } from "react";
import { CollarContext } from "../../context/CollarContext";
import MaxWidthDialog from "../../ComponentsV2/successDialog";

const tabData = [
  {
    label: "all",
    child: <ShowCollars show="all" />,
  },
  {
    label: "assigned",
    child: <ShowCollars show="assigned" />,
  },
  {
    label: "not assigned",
    child: <ShowCollars show="not assigned" />,
  },
];

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
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        <BackdropLoader open={openBackdropLoader} />
        <TabPane
          text="All Collars"
          btnText="Add New Collar"
          btnIcon={true}
          onBtnClick={() => handleCollarModalOpen("add")}
        />
        <CustomModal
          content={contentType()}
          openModal={openAddCollarModal}
          handleClose={handleCollarModalClose}
        />
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default Collars;
