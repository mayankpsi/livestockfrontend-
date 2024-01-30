import React, { useState } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { BtnGroup, BackdropLoader } from "../../ComponentsV2";
import { Container, Stack } from "@mui/material";
import ShowProfile from "./showProfile";
import ProfileSecurity from "./profileSecurity";
import useProfileContext from "../../hooks/useProfileContext";

const btnData = [
  {
    label: "profile",
  },
  {
    label: "security",
  },
];
const BreadcrumbData = [
  {
    label: "profile",
    link: "profile",
  },
];
const ProfilePage = () => {
  const [showProfileTab, setShowProfileTab] = useState("profile");

  const {
    showConfirmModal,
    handleConfirmWindowClose,
    handleConfirmAccountDelete,
    snackbarAlert,
    onSnackbarAlertClose,
    openBackdropLoader,
  } = useProfileContext();

  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={handleConfirmAccountDelete}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8, pb: 5 }}>
        {/* <BackdropLoader open={openBackdropLoader} /> */}
        <Stack direction="column" alignItems={"center"}>
          <BtnGroup
            btnData={btnData}
            activeBtn={showProfileTab}
            onChange={(ele) => setShowProfileTab(ele)}
          />
          {showProfileTab === "profile" ? <ShowProfile /> : <ProfileSecurity />}
        </Stack>
      </Container>
    </AdminUIContainer>
  );
};

export default ProfilePage;
