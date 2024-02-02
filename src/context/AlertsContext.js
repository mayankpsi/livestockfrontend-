import { useState, useEffect, createContext } from "react";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";
import useErrorMessage from "../hooks/useErrorMessage";
import { TypographyPrimary } from "../ComponentsV2/themeComponents";

const alerts = [
  {
    alertName: "High Temperature",
    collarUid: "collar1",
    livestockName: "cow1",
    thresholdValue: "103°F",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>107 °F</TypographyPrimary>,
    ],
    time: "12:45 PM",
    date: "2023-01-05",
  },
  {
    alertName: "Low Temperature",
    collarUid: "collar2",
    livestockName: "cow2",
    thresholdValue: "95°F",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>92 °F</TypographyPrimary>,
    ],
    time: "09:30 AM",
    date: "2023-01-06",
  },
  {
    alertName: "High Heartbeat",
    collarUid: "collar1",
    livestockName: "cow1",
    thresholdValue: "120 bpm",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>135 bpm</TypographyPrimary>,
    ],
    time: "03:15 PM",
    date: "2023-01-07",
  },
  {
    alertName: "Low Heartbeat",
    collarUid: "collar4",
    livestockName: "cow4",
    thresholdValue: "50 bpm",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>45 bpm</TypographyPrimary>,
    ],
    time: "10:00 AM",
    date: "2023-01-08",
  },
  {
    alertName: "High Steps",
    collarUid: "collar2",
    livestockName: "cow2",
    thresholdValue: "2000",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>2500</TypographyPrimary>,
    ],
    time: "01:30 PM",
    date: "2023-01-09",
  },
  {
    alertName: "Low Steps",
    collarUid: "collar3",
    livestockName: "cow3",
    thresholdValue: "500",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>400</TypographyPrimary>,
    ],
    time: "11:45 AM",
    date: "2023-01-10",
  },
  {
    alertName: "Low Rumination",
    collarUid: "collar5",
    livestockName: "cow5",
    thresholdValue: "20",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>15</TypographyPrimary>,
    ],
    date: "2023-01-13",
  },
  {
    alertName: "High Rumination",
    collarUid: "collar6",
    livestockName: "cow6",
    thresholdValue: "40",
    alarmValue: [
      <TypographyPrimary sx={{ color: "red" }}>50</TypographyPrimary>,
    ],
    time: "08:00 AM",
    date: "2023-01-14",
  },
];

export const AlertsContext = createContext();

export const AlertsContextProvider = ({ children }) => {
  const { getErrorMessage } = useErrorMessage();
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });
  const [alertDeletedId, setAlertDeletedId] = useState();
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };
  const [AllAlertData, setAllAlertData] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [alertsDataLength, setAlertsDataLength] = useState();
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const pageLimit = 10;

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const { formattedDate, paginationDateFormat } = useDateFormat();

  // GET ALL ALERTS
  useEffect(() => {
    setOpenBackdropLoader(true);
    request({
      url: `/liveStock/getUsersLiveStockAllAlerts?startDate=${paginationDateFormat(
        selectedDate[0]?.startDate
      )}&page=${paginationPageNo}&limit=${pageLimit}&endDate=${paginationDateFormat(
        selectedDate[0]?.endDate
      )}`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const data = res?.data?.data?.alertData || [];
          const formattedData = data?.map((alert) => ({
            id: alert?._id,
            alertName: alert?.message,
            collarUid: alert?.assignedDevice?.uID,
            livestockName: alert?.liveStockName,
            thresholdValue: alert?.thresholdValue,
            alarmValue: alert?.alertValue,
            time: formattedDate(alert?.createdAt, "time"),
            date: formattedDate(alert?.createdAt, "date"),
          }));
          setAllAlertData(formattedData);
          setPageCount(res?.data?.data?.pageCount);
          setAlertsDataLength(res?.data?.data?.dataLength || 0);
        } else {
          const msg = getErrorMessage(res);
          setAllAlertData([]);
          setPageCount(0);
          setAlertsDataLength(0);
          throw new Error(msg);
        }
      })
      .catch((err) => {
        const firstLoad =
          formattedDate(new Date(), "date") ===
            formattedDate(selectedDate[0].startDate, "date") &&
          formattedDate(new Date(), "date") ===
            formattedDate(selectedDate[0].endDate, "date");
        if (!firstLoad) openSnackbarAlert("error", err.message);
      })
      .finally(() => setOpenBackdropLoader(false));
  }, [selectedDate, paginationPageNo]);

  //HANDLE ALERT DELETE
  const handleAlertDelete = (alertId) => {
    if (alertsDataLength) {
      setShowConfirmModal({ open: true, confirmBtn: true });
      setAlertDeletedId(alertId);
    } else {
      openSnackbarAlert("error", "Nothing to Clear");
    }
  };

  const handleAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/liveStock/DeleteLiveStockAlerts?alertID=${alertDeletedId}`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Alert successfully deleted!");
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      const msg = error?.message;
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", msg);
    }
  };

  const handleAllAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: "/liveStock/deleteAllAlerts",
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "All Alerts successfully deleted!");
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      const msg = err?.message || getErrorMessage(err);
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", msg);
    }
  };

  return (
    <AlertsContext.Provider
      value={{
        handleAlertDelete,
        handleAlertDeleteConfirm,
        showConfirmModal,
        handleConfirmWindowClose,
        handleAlertDeleteConfirm,
        snackbarAlert,
        onSnackbarAlertClose,
        openBackdropLoader,
        selectedDate,
        setSelectedDate,
        AllAlertData,
        pageCount,
        paginationPageNo,
        setPaginationPageNo,
        alertsDataLength,
        alertDeletedId,
        handleAllAlertDeleteConfirm,
        openSnackbarAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
