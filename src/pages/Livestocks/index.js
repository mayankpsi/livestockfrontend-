import AdminUIContainer from "../../layout/AdminUIContainer";
import {Breadcrumb,CustomTabs, TabPane, CustomModal, BackdropLoader} from "../../ComponentsV2";
import { Container } from "@mui/material";
import ShowLivestocks from "./showLivestocks";
import AddLivestockModalContent from "./AddLivestockModalContent";
import useLivestockContext from "../../hooks/useLivestockContext";

const tabData = [
  {
    label: "All Livestocks",
    child: <ShowLivestocks show="all" />,
  },
  {
    label: "Safe",
    child: <ShowLivestocks show="safe" />,
  },
  {
    label: "Unsafe",
    child: <ShowLivestocks show="unsafe" />,
  },
];

const Livestocks = () => {
  const {
    openAddLiveStockModal,
    openBackdropLoader,
    modalContentType,
    handleLivestockModalOpen,
    handleLivestockModalClose,
    showConfirmModal,
    handleLivestockDeleteConfirm,
    handleConfirmWindowClose,
    snackbarAlert,
    onSnackbarAlertClose
  } = useLivestockContext();


  const contentType = () => {
    if (modalContentType === "add") {
      return <AddLivestockModalContent />;
    } 
    // else if(modalContentType === "delete"){
    //   return <DeleteCollarModalContent />;
    // }
  };

  const BreadcrumbData = [{
    label:'livestocks',
    link:'livestocks'
  }]
  return (
    <AdminUIContainer
    openModal={showConfirmModal.open}
    showConfirmBtn={showConfirmModal.confirmBtn}
    handleModalClose={handleConfirmWindowClose}
    onConfirm={handleLivestockDeleteConfirm}
    openAlert={snackbarAlert.open}
    alertMessage={snackbarAlert.message}
    alertType={snackbarAlert.type}
    closeAlert={onSnackbarAlertClose}
    BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8 ,pb:5}}>
        <BackdropLoader open={openBackdropLoader} />
        <TabPane
          text="All Livestocks"
          btnText="Add Livestock"
          btnIcon={true}
          onBtnClick={() => handleLivestockModalOpen("add")}
        />
        <CustomModal
          content={contentType()}
          openModal={openAddLiveStockModal}
          handleClose={handleLivestockModalClose}
        />
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default Livestocks;
