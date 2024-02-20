import { Container } from "@mui/material";
import { CustomModal, TabPane } from "../../../ComponentsV2";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import AddUserContent from "./AddUserContent";
import { useUserManagementContext } from "./context/UserManagementContext";
import ShowUsers from "./ShowUsers";

const BreadcrumbData = [
  {
    label: "User Management",
    link: "users",
  },
];

const UserManagement = () => {
  const { addUserModal, handleAddUserModalCancel, handleAddUserModalOpen } =
    useUserManagementContext();
  return (
    <>
      <AdminUIContainer BreadcrumbData={BreadcrumbData}>
        <Container maxWidth="xl" sx={{ marginTop: 3, pb: 0 }}>
          <TabPane
            text="All Users"
            btnText="Add User"
            btnIcon={true}
            hover={true}
            onBtnClick={handleAddUserModalOpen}
          />
          <ShowUsers />
          <CustomModal
            content={<AddUserContent />}
            openModal={addUserModal}
            handleClose={handleAddUserModalCancel}
          />
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default UserManagement;
