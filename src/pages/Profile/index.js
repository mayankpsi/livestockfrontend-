import React, { useState } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import {Breadcrumb, BtnGroup} from "../../ComponentsV2";
import { Container, Stack } from "@mui/material";
import ShowProfile from "./showProfile";
import ProfileSecurity from "./profileSecurity";

const btnData = [
  {
    label: "profile",
  },
  {
    label: "security",
  },
];
const BreadcrumbData = [{
  label:'profile',
  link:'profile'
}]
const ProfilePage = () => {
  const [showProfileTab, setShowProfileTab] = useState("profile");

  return (
    <AdminUIContainer BreadcrumbData={BreadcrumbData}>
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
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
