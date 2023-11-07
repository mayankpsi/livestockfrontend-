import { createContext, useState, useEffect } from "react";
import { VisibilityOutlinedIcon, DeleteOutlineOutlinedIcon } from "../icons";
import { CustomLabel } from "../ComponentsV2";
import { useNavigate } from "react-router-dom";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";

export const LivestockContext = createContext();

export const LivestockContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [allLivestocks, setAllLivestocks] = useState([]);
  const [modalContentType, setModalContentType] = useState("add");
  const [openAddLiveStockModal, setOpenAddLivestockModal] = useState(false);
  const [showLocationTab, setShowLocationTab] = useState("location");
  const [livestockHealthActiveTab, setLivestockHealthActiveTab] = useState("");

  // new livestock
  const [addNewLivestock, setAddNewLivestock] = useState({
    collarUID: "",
    livestockUID: "",
    livestockName: "",
    livestockGender: "",
  });
  const [addNewLivestockLoading, setAddNewLivestockLoading] = useState(false);

  const [tempThreshold, setTempThreshold] = useState([
    {
      label: "low temperature",
      name: "lowTemp",
      type: "warning",
      value: "26",
    },
    {
      label: "high temperature",
      name: "highTemp",
      type: "error",
      value: "40",
    },
  ]);
  const [isLivestockTempAlertsEdit, serIsLivestockTempAlertsEdit] =
    useState(false);

  const [heartbeatThreshold, setHeartbeatThreshold] = useState([
    {
      label: "low heartbeat",
      name: "lowHeartbeat",
      type: "warning",
      value: "26",
    },
    {
      label: "high heartbeat",
      name: "highHeartbeat",
      type: "error",
      value: "40",
    },
  ]);
  const [isLivestockHeartbeatAlertsEdit, setIsLivestockHeartbeatAlertsEdit] =
    useState(false);

  const [humidityThreshold, setHumidityThreshold] = useState([
    {
      label: "low humidity",
      name: "lowHumidity",
      type: "warning",
      value: "26",
    },
    {
      label: "high humidity",
      name: "highHumidity",
      type: "error",
      value: "52",
    },
  ]);

  const [isLivestockHumidityAlertsEdit, setIsLivestockHumidityAlertsEdit] =
    useState(false);

  //BACKDROP
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);

  const [geofenceThreshold, setGeofenceThreshold] = useState([
    {
      label: "Radius",
      name: "radius",
      type: "warning",
      value: "50",
    },
  ]);
  const [isLivestockGeofenceAlertsEdit, setIsLivestockGeofenceAlertsEdit] =
    useState(false);

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  //CONFIRM MODAL
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });

  const [deleteLivestockId, setDeleteLivestockId] = useState(null);
  const { formattedDate } = useDateFormat();

  // PAGINATION AND RANGE DATE
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date("2023-11-01"),
      endDate: new Date("2023-11-01"),
      key: "selection",
    },
  ]);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const pageLimit = 10;

  //GET ALL LIVESTOCK
  useEffect(() => {
    setOpenBackdropLoader(true);
    request({ url: "/liveStock/getAll" })
      .then((res) => {
        const formattedData = res?.data?.data?.map((col) => ({
          id: col._id + "id",
          liveStockUID: col?.uID,
          livestockName: col?.name,
          collarID: col?.assignedDevice?.uID ? col?.assignedDevice?.uID : "N/A",
          addedOn: formattedDate(col?.createdAt, false),
          status: col?.status ? "safe" : "unsafe",
          currentStatus: (
            <CustomLabel
              text={col?.liveStocklocationStatus || "N/A"}
              type={
                col?.liveStocklocationStatus?.toLowerCase() === "safe"
                  ? "success"
                  : "error"
              }
              width={125}
              marginAuto={true}
            />
          ),
          lastUpdate: formattedDate(col?.updatedAt, true),
          action: [
            <VisibilityOutlinedIcon
              fontSize="large"
              onClick={() => navigate(`/livestocks/${col?._id}`)}
            />,
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              onClick={() => handleLivestockDelete(col?._id, col?.status)}
            />,
          ],
        }));
        setAllLivestocks(formattedData);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  }, [addNewLivestockLoading]);

  // handle modal open
  const handleLivestockModalOpen = (type) => {
    setModalContentType(type);
    setOpenAddLivestockModal(true);
  };
  // handle livestock modal close
  const handleLivestockModalClose = () => setOpenAddLivestockModal(false);

  //HANDLE LIVESTOCK DELETE
  const handleLivestockDelete = async (livestockId, isCollarAssign) => {
    if (isCollarAssign) {
      setShowConfirmModal({ open: true, confirmBtn: false });
    } else {
      setShowConfirmModal({ open: true, confirmBtn: true });
    }
    setDeleteLivestockId(livestockId);
  };

  const handleLivestockDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    const res = await request({
      url: `/liveStock/delete?liveStockID=${deleteLivestockId}`,
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
  // HANDLE ADD COLLAR
  const handleAddLivestockChange = (data) => {
    const { name, value } = data.target;
    setAddNewLivestock({ ...addNewLivestock, [name]: value });
  };

  const handleAddLivestock = async () => {
    setAddNewLivestockLoading(true);
    const body = {
      uID: addNewLivestock?.livestockUID,
      name: addNewLivestock?.livestockName,
      gender: addNewLivestock?.livestockGender,
      deviceID: addNewLivestock?.collarUID,
    };
    try {
      const res = await request({
        url: "/liveStock/create",
        method: "POST",
        data: body,
      });
      alert(res?.data?.message);
    } catch (error) {
      alert(error.message);
    }
    setAddNewLivestock({
      collarUID: "",
      livestockUID: "",
      livestockName: "",
      livestockGender: "",
    });
    handleLivestockModalClose();
    setAddNewLivestockLoading(false);
  };

  const handleLivestockTempAlertsChange = (event) => {
    const { name, value } = event.target;
    const updatedValues = tempThreshold?.map((ele) => {
      if (ele.name === name) {
        return {
          ...ele,
          value: value,
        };
      }
      return ele;
    });
    setTempThreshold(updatedValues);
  };

  const handleLivestockHeartbeatAlertsChange = (event) => {
    const { name, value } = event.target;
    const updatedValues = heartbeatThreshold?.map((ele) => {
      if (ele.name === name) {
        return {
          ...ele,
          value: value,
        };
      }
      return ele;
    });
    setHeartbeatThreshold(updatedValues);
  };

  const handleLivestockHumidityAlertsChange = (event) => {
    const { name, value } = event.target;
    const updatedValues = humidityThreshold?.map((ele) => {
      if (ele.name === name) {
        return {
          ...ele,
          value: value,
        };
      }
      return ele;
    });
    setHumidityThreshold(updatedValues);
  };

  const handleLivestockGeofenceAlertsChange = (event) => {
    const { name, value } = event.target;
    const updatedValues = geofenceThreshold?.map((ele) => {
      if (ele.name === name) {
        return {
          ...ele,
          value: value,
        };
      }
      return ele;
    });
    setGeofenceThreshold(updatedValues);
  };

  //SNACKBAR
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

  // CONFIRM MODAL
  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  const date = "2023-10-31";
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "2-digit",
    weekday: "long",
  };
  const d = new Date();
  const formate = new Intl.DateTimeFormat("en-US", options).format(d);

  return (
    <LivestockContext.Provider
      value={{
        allLivestocks,
        modalContentType,
        handleLivestockModalOpen,
        openAddLiveStockModal,
        setOpenAddLivestockModal,
        allLivestocks,
        showLocationTab,
        setShowLocationTab,
        livestockHealthActiveTab,
        setLivestockHealthActiveTab,
        handleLivestockModalClose,
        addNewLivestock,
        setAddNewLivestock,
        handleAddLivestockChange,
        addNewLivestockLoading,
        setAddNewLivestockLoading,
        handleAddLivestock,
        tempThreshold,
        setTempThreshold,
        handleLivestockTempAlertsChange,
        isLivestockTempAlertsEdit,
        serIsLivestockTempAlertsEdit,
        heartbeatThreshold,
        setHeartbeatThreshold,
        isLivestockHeartbeatAlertsEdit,
        setIsLivestockHeartbeatAlertsEdit,
        geofenceThreshold,
        setGeofenceThreshold,
        isLivestockGeofenceAlertsEdit,
        setIsLivestockGeofenceAlertsEdit,
        handleLivestockHeartbeatAlertsChange,
        handleLivestockGeofenceAlertsChange,
        humidityThreshold,
        handleLivestockHumidityAlertsChange,
        isLivestockHumidityAlertsEdit,
        setIsLivestockHumidityAlertsEdit,
        openSnackbarAlert,
        onSnackbarAlertClose,
        showConfirmModal,
        handleConfirmWindowClose,
        snackbarAlert,
        onSnackbarAlertClose,
        handleLivestockDeleteConfirm,
        openSnackbarAlert,
        openBackdropLoader,
        selectedDate,
        setSelectedDate,
        paginationPageNo,
        setPaginationPageNo,
        pageCount,
        setPageCount,
        pageLimit,
      }}
    >
      {children}
    </LivestockContext.Provider>
  );
};
