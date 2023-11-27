import { createContext, useState, useEffect } from "react";
import { request } from "../apis/axios-utils";
import useSocket from "../hooks/useSocket";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [selectedNotificationTab, setSelectedNotificationTab] =
    useState("unread");
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [allUnreadNotifications, setAllUnreadNotifications] = useState([]);
  const [allReadNotifications, setAllReadNotifications] = useState([]);
  const [unReadUtils, setUnreadUtils] = useState({
    dataLength: 0,
    paginationPageNo: 1,
    pageCount: 1,
  });
  const [readUtils, setReadUtils] = useState({
    dataLength: 0,
    paginationPageNo: 1,
    pageCount: 1,
  });

  const socket = useSocket();

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };

  useEffect(() => {
    getAllUnreadNotification();
    getAllReadNotification();
  }, []);

  useEffect(() => {
    socket.on("notification", (payload) => {
      console.log(payload, "payload--payload--payload--payload");
    });
  }, []);

  const getAllUnreadNotification = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/getUnreadNotfication?page=${unReadUtils?.paginationPageNo}&limit=10`,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setAllUnreadNotifications(data?.unreadAlertData);
        setOpenBackdropLoader(false);
        setUnreadUtils({
          ...unReadUtils,
          dataLength: data?.dataLength,
          pageCount: data?.pageCount,
        });
      } else {
        setAllUnreadNotifications([]);
        setUnreadUtils({
          ...unReadUtils,
          dataLength: 0,
          pageCount: 1,
        });
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setAllUnreadNotifications([]);
      setOpenBackdropLoader(false);
    }
  };

  const getAllReadNotification = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/getReadNotification?page=${readUtils?.paginationPageNo}&limit=10`,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setAllReadNotifications(data?.readalertData);
        setOpenBackdropLoader(false);
        setReadUtils({
          ...readUtils,
          dataLength: data?.dataLength,
          pageCount: data?.pageCount,
        });
      } else {
        setAllReadNotifications([]);
        setReadUtils({
          ...readUtils,
          dataLength: 0,
          pageCount: 1,
        });
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setAllReadNotifications([]);
      setOpenBackdropLoader(false);
    }
  };

  const setUnreadToReadNotification = async (alertId) => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/updateSingleAltNotification?alertID=${alertId}`,
        method: "PATCH",
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setAllReadNotifications(data?.unreadAlertData);
        setOpenBackdropLoader(false);
      } else {
        setAllReadNotifications([]);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setAllReadNotifications([]);
      openSnackbarAlert("success", error?.message);
      setOpenBackdropLoader(false);
    }
  };

  const setAllUnreadToReadNotification = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/updateAlertToRead`,
        method: "PATCH",
      });
      if (res?.status === 200) {
        openSnackbarAlert("success", "Read All Notifications");
        setOpenBackdropLoader(false);
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      openSnackbarAlert("error", error?.message);
      setOpenBackdropLoader(false);
    }
  };

  const clearAllReadNotification = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/clearReadNotification`,
        method: "PUT",
      });
      if (res?.status === 200) {
        openSnackbarAlert("success", "Cleared All Notifications");
        setOpenBackdropLoader(false);
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      openSnackbarAlert("error", error?.message);
      setOpenBackdropLoader(false);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        getAllUnreadNotification,
        allUnreadNotifications,
        allReadNotifications,
        setUnreadToReadNotification,
        setAllUnreadToReadNotification,
        snackbarAlert,
        openBackdropLoader,
        onSnackbarAlertClose,
        selectedNotificationTab,
        setSelectedNotificationTab,
        getAllReadNotification,
        clearAllReadNotification,
        unReadUtils,
        setUnreadUtils,
        readUtils,
        setReadUtils,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
