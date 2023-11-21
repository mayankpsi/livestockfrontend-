import React, { useState } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { BtnGroup, TabPaneV2, NoNotifications, NotificationCard} from "../../ComponentsV2";
import { Typography, Container, Stack } from "@mui/material";
import { notificationBtnData } from "./Data";

const rightData = ["Livestock Name", "Device UID", "Alert Name"];
const leftData = ["12:01", "20-11-2023"];

const Notifications = () => {
  const [selectedNotificationTab, setSelectedNotificationTab] =
    useState("unread");

  const BreadcrumbData = [
    {
      label: "Notifications",
      link: "/",
    },
  ];
  const isUnRead =  selectedNotificationTab === "unread";
  return (
    <AdminUIContainer
      //   openAlert={snackbarAlert.open}
      //   alertMessage={snackbarAlert.message}
      //   alertType={snackbarAlert.type}
      //   closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        {/* <BackdropLoader open={openBackdropLoader} /> */}

        <Typography
          variant="h2"
          sx={{ fontSize: "2rem", fontWeight: 600, mb: 2 }}
        >
          Manage Notifications
        </Typography>
        <Stack direction="column" alignItems="center" gap={1}>
          <BtnGroup
            btnData={notificationBtnData}
            activeBtn={selectedNotificationTab}
            onChange={(ele) => setSelectedNotificationTab(ele)}
          />
           <Stack width={"100%"}>
            <TabPaneV2
              paneText="showing 10 out of 1000 Notifications"
              paneTextColor="#000"
              datePicker={false}
              clearBtn={false}
              btnText={isUnRead? "Read All" : "Clear All"}
              onBtnClick={() => {}}
              btnColor="#fff"
              btnBg={isUnRead? "#B58B5D" : "#FF0000"}
            />
          </Stack>
          {/* <NoNotifications/> */}
          {selectedNotificationTab === "unread" ? (
            <Stack width="100%" direction="column" gap={2}>
                <NotificationCard rightData={rightData} leftData={leftData} customStyle={{background:"rgba(134, 99, 62, 0.2)", border:"1px solid rgba(134, 99, 62, 1)"}} />
                <NotificationCard rightData={rightData} leftData={leftData} customStyle={{background:"rgba(134, 99, 62, 0.2)", border:"1px solid rgba(134, 99, 62, 1)"}} />
                <NotificationCard rightData={rightData} leftData={leftData} customStyle={{background:"rgba(134, 99, 62, 0.2)", border:"1px solid rgba(134, 99, 62, 1)"}} />
                <NotificationCard rightData={rightData} leftData={leftData} customStyle={{background:"rgba(134, 99, 62, 0.2)", border:"1px solid rgba(134, 99, 62, 1)"}} />
            </Stack>
          ) : (
            <Stack width="100%" direction="column" gap={2}>
                 <NotificationCard rightData={rightData} leftData={leftData} customStyle={{border:"1px solid #dddddd"}}/>
                 <NotificationCard rightData={rightData} leftData={leftData} customStyle={{border:"1px solid #dddddd"}}/>
                 <NotificationCard rightData={rightData} leftData={leftData} customStyle={{border:"1px solid #dddddd"}}/>
                 <NotificationCard rightData={rightData} leftData={leftData} customStyle={{border:"1px solid #dddddd"}}/>
            </Stack>
          )}
        </Stack>

      </Container>
    </AdminUIContainer>
  );
};

export default Notifications;
