import { useState, useEffect, createContext } from "react";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";

export const AlertsContext = createContext();

export const AlertsContextProvider = ({ children }) => {
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
  const [AllAlertData, setAllAlertData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [alertsDataLength, setAlertsDataLength] = useState(0);
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

  // const getRoundOffDigit = (name, value) => {
  //   if (name?.toLocaleLowerCase().includes("geofence")) {
  //     const val = value?.toString()?.slice(0,5);
  //     console.log(val)
  //     const final = val > 1 ? `${val} Km` : `${val * 1000} m`;
  //     return final;
  //   } else {
  //     return value;
  //   }
  // };

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
          setAlertsDataLength(res?.data?.data?.dataLength);
        } else {
          setAllAlertData([]);
          throw new Error("something went wrong");
        }
        // const formattedData =
        // setCollars(formattedData);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  }, [selectedDate, paginationPageNo]);

  //HANDLE ALERT DELETE
  const handleAlertDelete = (alertId) => {
    setShowConfirmModal({ open: true, confirmBtn: true });
    setAlertDeletedId(alertId);
  };

  const handleAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    const res = await request({
      url: `/liveStock/DeleteLiveStockAlerts?alertID=${alertDeletedId}`,
      method: "DELETE",
    });
    if (res?.status === 200) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("success", "Collar successfully deleted!");
    } else {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", "Something went wrong :(");
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
        alertsDataLength
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
