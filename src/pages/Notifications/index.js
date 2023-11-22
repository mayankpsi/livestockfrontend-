import React, { useState } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  BtnGroup,
  TabPaneV2,
  NoNotifications,
  NotificationCard,
  BackdropLoader,
} from "../../ComponentsV2";
import { Typography, Container, Stack } from "@mui/material";
import { notificationBtnData } from "./Data";
import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import useDateFormat from "../../hooks/useDateFormat";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const {
    openBackdropLoader,
    selectedNotificationTab,
    setSelectedNotificationTab,
    snackbarAlert,
    setUnreadToReadNotification,
    onSnackbarAlertClose,
    allUnreadNotifications,
    allReadNotifications,
    setAllUnreadToReadNotification,
    clearAllReadNotification,
  } = useContext(NotificationContext);
  const { formattedDate } = useDateFormat();

  const BreadcrumbData = [
    {
      label: "Notifications",
      link: "/",
    },
  ];
  const isUnRead = selectedNotificationTab === "unread";

  const getNotificationData = (data, type) => {
    const rightData = [];
    const leftData = [];
    rightData.push(
      data?.liveStockName,
      data?.assignedDevice?.uID,
      data?.message
    );
    leftData.push(
      formattedDate(data?.createdAt, "time"),
      formattedDate(data?.createdAt, "date")
    );
    if (type === "right") return rightData;
    else return leftData;
  };

  const handleNotificationClick = (liveStockId, alertId) => {
    navigate(`/livestocks/${liveStockId}`);
    localStorage.setItem("currentTab", 3);
    setUnreadToReadNotification(alertId);
  };
  return (
    <AdminUIContainer
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        <BackdropLoader open={openBackdropLoader} />
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
              btnText={isUnRead ? "Read All" : "Clear All"}
              onBtnClick={
                isUnRead
                  ? setAllUnreadToReadNotification
                  : clearAllReadNotification
              }
              btnColor="#fff"
              btnBg={isUnRead ? "#B58B5D" : "#FF0000"}
            />
          </Stack>
          {selectedNotificationTab === "unread" ? (
            <Stack width="100%" direction="column" gap={2}>
              {allUnreadNotifications?.length ? (
                allUnreadNotifications?.map((notification) => (
                  <NotificationCard
                    key={notification?._id}
                    onClick={() =>
                      handleNotificationClick(
                        notification?.liveStock,
                        notification?._id
                      )
                    }
                    rightData={getNotificationData(notification, "right")}
                    leftData={getNotificationData(notification, "left")}
                    customStyle={{
                      background: "rgba(134, 99, 62, 0.2)",
                      border: "1px solid rgba(134, 99, 62, 1)",
                      cursor: "pointer",
                    }}
                  />
                ))
              ) : (
                <NoNotifications />
              )}
            </Stack>
          ) : (
            <Stack width="100%" direction="column" gap={2}>
              {allReadNotifications?.length ? (
                allReadNotifications?.map((notification) => (
                  <NotificationCard
                    key={notification?._id}
                    rightData={getNotificationData(notification, "right")}
                    leftData={getNotificationData(notification, "left")}
                    customStyle={{
                      background: "#fff",
                      border: "1px solid #eeeeee",
                    }}
                  />
                ))
              ) : (
                <NoNotifications />
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </AdminUIContainer>
  );
};

export default Notifications;
